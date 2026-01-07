export const getPublicURL = (
  path: string,
  bucketName: string = 'user_images'
) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${path}`;
};
