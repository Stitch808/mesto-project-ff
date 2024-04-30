function renderLoading(isLoading, element, defaultStatus='Сохранить', loadingStatus='Сохранение...') {
  if(isLoading) {
    element.textContent = loadingStatus
  }
  else {
    element.textContent = defaultStatus
  }
}

export function handleSubmit(request, evt, loadingText='Сохранение...') {
  evt.preventDefault();
  const submitButton = evt.submitter
  const defaultStatus = submitButton.textContent

  renderLoading(true, submitButton, defaultStatus, loadingText)
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultStatus, loadingText);
    });
}