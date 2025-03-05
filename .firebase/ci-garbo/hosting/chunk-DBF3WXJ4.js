import{a as q,b as A,c as B}from"./chunk-OCJI53YB.js";import"./chunk-SLQZJWGB.js";import{A as D,R as j,d as C,f as F,i as b,k as M,n as S,o as a,p as I,q as _,r as x,s as y,t as E,u as N,v as P,w as O,x as R,y as k,z as w}from"./chunk-IQNOLRXG.js";import{n as h}from"./chunk-NFOMS6WR.js";import{Ab as o,Bb as e,Cb as n,Jb as u,Vb as r,Ya as s,Za as m,ac as g,hb as d,ka as p,rb as v}from"./chunk-VTPCH2WO.js";import"./chunk-MDXMAHBI.js";import"./chunk-KT3CPUTC.js";var G=class c{constructor(t,i,l,f){this.fb=t;this.route=i;this.router=l;this.funcionarioService=f;this.form=this.fb.group({matricula:["",a.required],nome:["",a.required],cargo:["",a.required],perfil:["",a.required],senha:["",a.required]})}form;funcionarioId=d(null);ngOnInit(){this.route.params.subscribe(t=>{t.id&&(this.funcionarioId.set(t.id),this.funcionarioService.recuperarPorId(t.id).subscribe(i=>{i&&this.form.patchValue(i)}))})}onSave(){if(this.form.valid)if(this.funcionarioId())this.funcionarioService.atualizar(this.funcionarioId(),this.form.value).subscribe(()=>{this.router.navigate(["/funcionario-list"])});else{let t={id:"",matricula:this.form.value.matricula,nome:this.form.value.nome,cargo:this.form.value.cargo,perfil:this.form.value.perfil,senha:this.form.value.senha};this.funcionarioService.inserir(t).subscribe(()=>{this.router.navigate(["/funcionario-list"])})}}onPrint(){console.log("Fun\xE7\xE3o imprimir n\xE3o implementada.")}onCancel(){this.router.navigate(["/funcionario-list"])}static \u0275fac=function(i){return new(i||c)(m(N),m(C),m(F),m(B))};static \u0275cmp=p({type:c,selectors:[["app-funcionario-form"]],standalone:!0,features:[g],decls:28,vars:1,consts:[[1,"form-container",3,"formGroup"],["appearance","fill"],["matInput","","formControlName","matricula"],["matInput","","formControlName","nome"],["matInput","","formControlName","cargo"],["matInput","","formControlName","perfil"],["matInput","","formControlName","senha","type","password"],[1,"button-group"],["mat-raised-button","","color","primary",3,"click"],["mat-raised-button","","color","warn",3,"click"]],template:function(i,l){i&1&&(n(0,"app-header"),o(1,"form",0)(2,"mat-form-field",1)(3,"mat-label"),r(4,"Matr\xEDcula"),e(),n(5,"input",2),e(),o(6,"mat-form-field",1)(7,"mat-label"),r(8,"Nome"),e(),n(9,"input",3),e(),o(10,"mat-form-field",1)(11,"mat-label"),r(12,"Cargo"),e(),n(13,"input",4),e(),o(14,"mat-form-field",1)(15,"mat-label"),r(16,"Perfil"),e(),n(17,"input",5),e(),o(18,"mat-form-field",1)(19,"mat-label"),r(20,"Senha"),e(),n(21,"input",6),e(),o(22,"div",7)(23,"button",8),u("click",function(){return l.onSave()}),r(24,"Salvar"),e(),o(25,"button",9),u("click",function(){return l.onCancel()}),r(26," Cancelar "),e()()(),n(27,"app-footer")),i&2&&(s(),v("formGroup",l.form))},dependencies:[h,P,x,S,I,_,y,E,k,R,O,D,w,M,b,q,A,j],styles:[".header-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-bottom:15px}.form-container[_ngcontent-%COMP%]{margin-top:20px;display:flex;flex-direction:column;align-items:center}.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:95%}@media (min-width: 800px){.form-container[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:30%}}.form-container[_ngcontent-%COMP%]   .button-group[_ngcontent-%COMP%]{margin-top:20px;display:flex;gap:20px}"]})};export{G as FuncionarioFormComponent};
