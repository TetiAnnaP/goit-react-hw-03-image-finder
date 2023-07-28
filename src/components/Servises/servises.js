export async function GetImages(newValue, page) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${newValue}&page=1&key=37406470-f77473b8e435a1e7065d6e2d2&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error('За цим запитом нічого немає!'));
}
