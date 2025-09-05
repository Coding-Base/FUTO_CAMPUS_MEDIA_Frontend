export function getVisitorId() {
  let id = localStorage.getItem('visitor_id');
  if (!id) {
    id = 'v_' + Math.random().toString(36).slice(2);
    localStorage.setItem('visitor_id', id);
  }
  return id;
}
