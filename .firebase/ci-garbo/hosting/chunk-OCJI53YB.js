import{b as F}from"./chunk-SLQZJWGB.js";import{Q as p,R as d}from"./chunk-IQNOLRXG.js";import{Ab as c,Bb as r,Mb as b,Nb as g,Vb as s,aa as u,ac as l,fa as f,ka as i,n as a,s as m}from"./chunk-VTPCH2WO.js";var O=["*"],h=class t{static \u0275fac=function(o){return new(o||t)};static \u0275cmp=i({type:t,selectors:[["app-header"]],standalone:!0,features:[l],ngContentSelectors:O,decls:4,vars:0,consts:[[1,"cabecalho-container"]],template:function(o,n){o&1&&(b(),c(0,"mat-toolbar",0)(1,"span"),s(2,"Cabe\xE7alho"),r(),g(3),r())},dependencies:[d,p],styles:[".cabecalho-container[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:10px 20px;background-color:#e7e7ec8e;border-bottom:2px solid rgb(143,191,238);width:100%;margin:0 auto}"]})};var C=class t{static \u0275fac=function(o){return new(o||t)};static \u0275cmp=i({type:t,selectors:[["app-footer"]],standalone:!0,features:[l],decls:3,vars:0,consts:[[1,"rodape-container"]],template:function(o,n){o&1&&(c(0,"mat-toolbar",0)(1,"span"),s(2,"Rodap\xE9"),r()())},dependencies:[d,p],styles:[".rodape-container[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:10px 20px;background-color:#e7e7ec8e;border-bottom:2px solid rgb(143,191,238);width:100%;margin:0 auto}"]})};var y=class t{constructor(e){this.afs=e;this.collection=e.collection("funcionarios")}collection;inserir(e){return a(this.collection.add(e))}atualizar(e,o){return a(this.collection.doc(e).update(o))}remover(e){return a(this.collection.doc(e).delete())}listarTodos(){return this.collection.valueChanges({idField:"id"})}listarPorParametro(e,o){return this.afs.collection("funcionarios",n=>n.where(e,"==",o)).valueChanges({idField:"id"})}recuperarPorId(e){return this.collection.doc(e).valueChanges()}recuperarPorParametro(e,o){return this.afs.collection("funcionarios",n=>n.where(e,"==",o)).valueChanges({idField:"id"}).pipe(m(n=>n&&n[0]))}static \u0275fac=function(o){return new(o||t)(f(F))};static \u0275prov=u({token:t,factory:t.\u0275fac,providedIn:"root"})};export{h as a,C as b,y as c};
