import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

	formData = {
    id:'',
    nome:'',
    artista:'',
    valor:'',
    imagem:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeaRiOZ37YCsugZSti7xlaBwRuKHwPHZViRDFHyQ02JTgT7LFc&s',
    ano:''
	}

  constructor(private apiService: ApiService, private alertController: AlertController, private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      console.log(this.router.getCurrentNavigation().extras.state);
      if (this.router.getCurrentNavigation().extras.state) {
        this.formData.id = this.router.getCurrentNavigation().extras.state.formDataParams.id;
        this.formData.nome = this.router.getCurrentNavigation().extras.state.formDataParams.nome;
        this.formData.artista = this.router.getCurrentNavigation().extras.state.formDataParams.artista;
        this.formData.valor = this.router.getCurrentNavigation().extras.state.formDataParams.valor;
        this.formData.imagem = this.router.getCurrentNavigation().extras.state.formDataParams.imagem;
        this.formData.ano = this.router.getCurrentNavigation().extras.state.formDataParams.ano;
      }
    });

  }

  ngOnInit() {
  }

  async formSubmit(){

    if(this.formData.id){ //Atualizar

      await this.apiService.sendPutRequest(this.formData.id, this.formData).subscribe((data)=>{
        console.log(data);
      }, error => {
        console.log(error);
      });

    }
    else{ //Criar

      await this.apiService.sendPostRequest(this.formData).subscribe((data)=>{
      	console.log(data);
      }, error => {
    		console.log(error);
    	});

    }

    const alert = await this.alertController.create({
      header: 'Tudo certo!',
      message: 'Álbum cadastrado no sistema.',
      buttons: ['OK']
    });

    await alert.present();

  }

}
