function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
  
    // Altera a classe do conteúdo para ajustar o espaçamento quando o sidebar for aberto ou fechado
    const content = document.querySelector('.content');
    content.classList.toggle('with-sidebar');
  }
  document.addEventListener("DOMContentLoaded", () => {
    const ctx1 = document.getElementById("chart1").getContext("2d");
    const ctx2 = document.getElementById("chart2").getContext("2d");
    const ctx3 = document.getElementById("chart3").getContext("2d");
  
    // Exemplo de gráfico
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Projeto 1', 'Projeto 2'],
        datasets: [{
          label: 'Projetos',
          data: [10, 20],
          backgroundColor: '#4CAF50',
        }]
      },
    });
  
    // Outros gráficos
  });
  