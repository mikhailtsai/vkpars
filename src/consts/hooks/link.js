const openLink = (url) => window.open(url, "_blank");
export const usePost = (data) => {
  openLink(`https://vk.com/wall${data.owner_id}_${data.id}`)
};

export const usePage = (data) => {
  openLink(
    data.type !== 'group'
    ? `https://vk.com/id${data.id}`
    : `https://vk.com/club${Math.abs(data.id)}`
    )
} 