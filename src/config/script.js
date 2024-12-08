function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  
    // Altera a classe do conteúdo para ajustar o espaçamento quando o sidebar for aberto ou fechado
    const content = document.querySelector('.content');
    content.classList.toggle('with-sidebar');
  }
  