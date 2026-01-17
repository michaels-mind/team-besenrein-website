'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, 
  {
    auth: { persistSession: false },
  }
);

export async function submitInquiry(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const service = formData.get('service') as string;
  const message = formData.get('message') as string;
  const files = formData.getAll('images') as File[];

  const imagePaths: string[] = [];

  if (!message || !email) {
    return { success: false, error: 'Pflichtfelder fehlen.' };
  }

  if (files && files.length > 0) {
    for (const file of files) {
      if (file.size === 0) continue;

      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const fileName = `${Date.now()}-${cleanFileName}`;
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data, error } = await supabase.storage
        .from('inquiry-images')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false
        });

      if (error) {
        console.error('Upload Error:', error);
      } else if (data?.path) {
        imagePaths.push(data.path);
      }
    }
  }

  const { error: dbError } = await supabase.from('inquiries').insert({
    name,
    email,
    phone,
    service,
    message,
    images: JSON.stringify(imagePaths), 
    status: 'neu',
  });

  if (dbError) {
    console.error('DB Error:', dbError);
    return { success: false, error: dbError.message };
  }

  return { success: true };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  cover_url: string | null;
  detail_urls: string[];
  images_order: string[];
}

export async function saveProject(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    
    // Debug Logging
    console.log('--- SAVE PROJECT DEBUG ---');
    console.log('ID:', id);
    console.log('Title:', title);
    console.log('Category:', category);

    const cover_url = formData.get('cover_url') as string;
    const detail_urls = JSON.parse(formData.get('detail_urls') as string);
    const images_order = JSON.parse(formData.get('images_order') as string);

    if (!id) return { success: false, error: 'ID fehlt (Interner Fehler)' };
    if (!title || title.trim() === '') return { success: false, error: 'Titel fehlt' };
    if (!category || category.trim() === '') return { success: false, error: 'Kategorie fehlt' };
    if (!description || description.trim() === '') return { success: false, error: 'Beschreibung fehlt' };

    const { error } = await supabase
      .from('projects')
      .upsert({ 
        id, title, category, description, 
        cover_url, detail_urls, images_order 
      })
      .eq('id', id);

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }

    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error) {
    console.error('Action Error:', error);
    return { 
      success: false, 
      error: 'Speichern fehlgeschlagen: ' + (error as Error).message 
    };
  }
}

export async function uploadProjectImage(
  projectId: string,
  file: File,
  type: 'cover' | 'detail'
) {
  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const timestamp = Date.now();
    const folder = type === 'cover' ? 'covers' : 'details';
    const fileName = `${folder}/${projectId}-${timestamp}-${cleanFileName}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from('projects')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('projects')
      .getPublicUrl(fileName);

    return { 
      success: true, 
      fileName, 
      publicUrl: urlData.publicUrl 
    };
  } catch (error) {
    return { 
      success: false, 
      error: (error as Error).message 
    };
  }
}

export async function deleteProjectImage(fileName: string) {
  try {
    const { error } = await supabase.storage
      .from('projects')
      .remove([fileName]);
    
    return { success: !error, error: error?.message };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
