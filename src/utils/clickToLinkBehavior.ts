const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href')?.substring(1);

  if (!targetId) return;

  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

export default handleLinkClick;
