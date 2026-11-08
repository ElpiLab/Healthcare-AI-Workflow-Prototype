const dashboard = document.querySelector('#dashboard-view');
const emptyView = document.querySelector('#empty-view');
const pageTitle = document.querySelector('#page-title');
const emptyTitle = document.querySelector('#empty-title');
const requestModal = document.querySelector('#request-modal');
const requestBody = document.querySelector('#requests-body');

function showView(title) {
  pageTitle.textContent = title;
  if (title === 'Übersicht') {
    dashboard.hidden = false;
    emptyView.hidden = true;
  } else {
    dashboard.hidden = true;
    emptyView.hidden = false;
    emptyTitle.textContent = title;
  }
  document.querySelectorAll('.nav-item[data-view]').forEach((item) => {
    item.classList.toggle('active', item.dataset.view === title);
  });
}

document.querySelectorAll('.nav-item[data-view]').forEach((item) => {
  item.addEventListener('click', () => showView(item.dataset.view));
});
document.querySelector('#back-button').addEventListener('click', () => showView('Übersicht'));
document.querySelector('#view-all').addEventListener('click', () => showView('Rezeptanfragen'));

document.querySelector('#new-request-btn').addEventListener('click', () => {
  requestModal.hidden = false;
  requestModal.querySelector('input').focus();
});
document.querySelector('#modal-close').addEventListener('click', () => requestModal.hidden = true);
requestModal.addEventListener('click', (event) => {
  if (event.target === requestModal) requestModal.hidden = true;
});

document.querySelector('#request-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const patient = form.get('patient');
  const medication = form.get('medication');
  const initials = patient.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const row = document.createElement('tr');
  row.innerHTML = `<td><div class="patient"><div class="mini-avatar blue-avatar">${initials}</div><strong>${patient}</strong></div></td><td>${medication}</td><td>gerade eben</td><td><span class="status pending">In Prüfung</span></td><td><button class="row-menu">•••</button></td>`;
  requestBody.prepend(row);
  requestModal.hidden = true;
  event.currentTarget.reset();
});

document.querySelector('#search-input').addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase().trim();
  requestBody.querySelectorAll('tr').forEach((row) => {
    row.hidden = !row.textContent.toLowerCase().includes(searchTerm);
  });
});
