import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonListHeader,
  IonLabel,
  IonBadge
} from '@ionic/angular/standalone';
import { AlertController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  calendarOutline, 
  timeOutline, 
  personOutline,
  laptopOutline,
  chatbubbleOutline,
  codeOutline,
  cloudOutline,
  shieldOutline,
  chatbubblesOutline,
  gitBranchOutline,
  brushOutline,
  lockClosedOutline,
  cafeOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

interface Palestra {
  id: number;
  titulo: string;
  horario: string;
  palestrante: string;
  descricao: string;
  icone: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonIcon,
    IonListHeader,
    IonLabel,
    IonBadge
  ]
})
// por ser um projeto simples, deixei num array mesmo, porém poderia usar algum banco de dados de preferência. 
export class HomePage {
  palestras: Palestra[] = [
    {
      id: 1,
      titulo: 'Como a IA já está mudando nosso dia a dia (e o que vem por aí)',
      horario: '09:00 - 10:30',
      palestrante: 'Amanda Silva - Pesquisadora Google',
      descricao: 'Sem promessas futuristas. Um papo reto sobre o que a IA faz hoje, onde ela erra e como podemos usar sem medo.',
      icone: 'chatbubbles-outline'
    },
    {
      id: 2,
      titulo: 'Microserviços: quando vale a pena e quando vira dor de cabeça',
      horario: '11:00 - 12:30',
      palestrante: 'Ricardo Santos - Tech Lead (ex-iFood)',
      descricao: 'Na prática, nem tudo precisa ser um microserviço. Vou contar os erros que cometi e o que faria diferente.',
      icone: 'git-branch-outline'
    },
    {
      id: 3,
      titulo: 'Design que funciona: o que ninguém te conta sobre UX no mundo real',
      horario: '14:00 - 15:30',
      palestrante: 'Carol Mendes - Designer Pleno',
      descricao: 'Chega de teoria bonita. Vou mostrar casos reais de apps que melhoraram (e pioraram) a experiência do usuário.',
      icone: 'brush-outline'
    },
    {
      id: 4,
      titulo: 'Cloud na veia: como não quebrar o banco com AWS (ou qualquer outra)',
      horario: '16:00 - 17:30',
      palestrante: 'Bruno Costa - Engenheiro de Plataforma',
      descricao: 'Dicas práticas pra subir suas coisas na nuvem sem gastar rios de dinheiro e sem surtar.',
      icone: 'cloud-outline'
    },
    {
      id: 5,
      titulo: 'Segurança não é só pra expert: primeiros passos pra não ser um alvo fácil',
      horario: '18:00 - 19:30',
      palestrante: 'Fernanda Lima - Security Analyst',
      descricao: 'Coisas simples que todo dev deveria saber pra não deixar brecha besta no código.',
      icone: 'lock-closed-outline'
    },
    {
      id: 6,
      titulo: 'Coffee & Talk: como sobreviver (e crescer) na área tech',
      horario: '19:30 - 20:30',
      palestrante: 'Bate-papo com 3 devs convidados',
      descricao: 'Sem palco, sem formalidade. Senta, pega um café e troca ideia sobre carreira, burnout e aquele projeto que deu errado.',
      icone: 'cafe-outline'
    }
  ];

  inscricoes: number[] = [];
  saudacao: string = '';
  dataCompleta: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      calendarOutline,
      timeOutline,
      personOutline,
      laptopOutline,
      chatbubbleOutline,
      codeOutline,
      cloudOutline,
      shieldOutline,
      chatbubblesOutline,
      gitBranchOutline,
      brushOutline,
      lockClosedOutline,
      cafeOutline,
      checkmarkCircleOutline
    });
    
    this.carregarInscricoes();
    this.definirSaudacaoEData();
  }
  // inventei moda aqui

  carregarInscricoes() {
    const salvo = localStorage.getItem('inscricoes');
    if (salvo) {
      this.inscricoes = JSON.parse(salvo);
    }
  }

  salvarInscricoes() {
    localStorage.setItem('inscricoes', JSON.stringify(this.inscricoes));
  }

  verificarInscrito(id: number): boolean {
    return this.inscricoes.includes(id);
  }

  adicionarInscricao(id: number) {
    if (!this.inscricoes.includes(id)) {
      this.inscricoes.push(id);
      this.salvarInscricoes();
    }
  }

  removerInscricao(id: number) {
    this.inscricoes = this.inscricoes.filter(i => i !== id);
    this.salvarInscricoes();
  }

  definirSaudacaoEData() {
    const agora = new Date();
    const hora = agora.getHours();
    
    if (hora >= 5 && hora < 12) {
      this.saudacao = 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }
    
    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const diaSemana = dias[agora.getDay()];
    const dia = agora.getDate();
    const mes = meses[agora.getMonth()];
    const ano = agora.getFullYear();
    
    this.dataCompleta = `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  }

  async abrirConfirmacao(palestra: Palestra) {
    const jaInscrito = this.verificarInscrito(palestra.id);
    
    if (jaInscrito) {
      const alert = await this.alertController.create({
        header: 'Cancelar Inscrição',
        subHeader: palestra.titulo,
        message: 'Você já está inscrito. Deseja cancelar sua inscrição?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              this.mostrarToastInfo(`Cancelamento não realizado para: ${palestra.titulo}`);
            }
          },
          {
            text: 'Sim, cancelar',
            role: 'confirm',
            handler: () => {
              this.removerInscricao(palestra.id);
              this.mostrarToastErro(`Inscrição cancelada com sucesso para: ${palestra.titulo}!`);
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Confirmar Inscrição',
        subHeader: palestra.titulo,
        message: 'Deseja confirmar sua inscrição nesta atividade?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.mostrarToastErro(`Operação cancelada para: ${palestra.titulo}`);
            }
          },
          {
            text: 'Sim',
            role: 'confirm',
            handler: () => {
              this.adicionarInscricao(palestra.id);
              this.mostrarToastSucesso(`Inscrição realizada com sucesso para: ${palestra.titulo}!`);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async mostrarToastSucesso(mensagem: string) {
    const toast = await this.toastController.create({
      message: `${mensagem}`,
      duration: 2500,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  async mostrarToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: `${mensagem}`,
      duration: 2500,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

  async mostrarToastInfo(mensagem: string) {
    const toast = await this.toastController.create({
      message: `${mensagem}`,
      duration: 2000,
      position: 'bottom',
      color: 'tertiary'
    });
    await toast.present();
  }
}