(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(a){if(a.ep)return;a.ep=!0;const l=r(a);fetch(a.href,l)}})();let q="https://mmi.unilim.fr/~lajudie6/SAE3.DWeb-DI.03-Base/api/",i=async function(e){let t={method:"GET"};try{var r=await fetch(q+e,t)}catch(a){return console.error("Echec de la requête : "+a),!1}return r.status!=200?(console.error("Erreur de requête : "+r.status),!1):await r.json()},E=async function(e,t){let r={method:"POST",body:t};try{var o=await fetch(q+e,r)}catch(l){return console.error("Echec de la requête : "+l),!1}return o.status!=200?(console.error("Erreur de requête : "+o.status),!1):await o.json()},d={};d.fetch=async function(e){return await i("movies/"+e)};d.fetchAll=async function(){return await i("movies")};d.save=async function(e){return await E("movies",e)};d.getTop3=async function(){return await i("movies/top3")};d.historyByTitle=async function(e){return await i("movies/historyByTitle?movie_title="+e)};d.movieCustomer=async function(e){return await i("movies/movie?customer="+e)};d.movieConsoParPays=async function(e){return await i("movies/movieConsoParPays?month="+e)};d.getMonth=async function(){return await i("movies/getMonth")};let f=function(e,t){let r=e;for(let o in t)r=r.replaceAll(new RegExp("{{"+o+"}}","g"),t[o]);return r};const T=await fetch("src/ui/movie/template.html"),M=await T.text();let L={render:function(e){let t="";Array.isArray(e)||(e=[e]);for(let r of e)t+=f(M,r);return t}},m={};m.fetch=async function(e){return await i("sales/"+e)};m.fetchAll=async function(){return await i("sales")};m.save=async function(e){return await E("sales",e)};m.getTotalSales=async function(){return await i("sales/salesThisMonth")};m.getSalesEvolution=async function(){return await i("sales/salesEvolution")};m.salesGenreEvolution=async function(){return await i("sales/salesGenreEvolution")};m.SalesByCountry=async function(){return await i("sales/salesByCountry")};const D=await fetch("src/ui/top/template.html"),G=await D.text();let b={render:function(e){let t="";Array.isArray(e)||(e=[e]);for(let r of e)t+=f(G,r);return t}},y={};y.fetch=async function(e){return await i("rentals/"+e)};y.fetchAll=async function(){return await i("rentals")};y.save=async function(e){return await E("rentals",e)};y.getRentalSales=async function(){return await i("rentals/rentalThisMonth")};y.getRentalsEvolution=async function(){return await i("rentals/rentalEvolution")};y.rentalGenreEvolution=async function(){return await i("rentals/rentalGenreEvolution")};y.RentalsByCountry=async function(){return await i("rentals/rentalByCountry")};const R=await fetch("src/ui/evolution/template.html"),F=await R.text();let j={render:function(e){let t="";Array.isArray(e)||(e=[e]);for(let r of e)t+=f(F,r);return t}};const H=await fetch("src/ui/genre/template.html"),P=await H.text();let _={render:function(e){let t="";Array.isArray(e)||(e=[e]);for(let r of e)t+=f(P,r);return t}};const $=await fetch("src/ui/country/template.html");await $.text();const B=await fetch("src/ui/history/template.html"),O=await B.text();let V={render:function(e){let t="";Array.isArray(e)||(e=[e]);for(let r of e)t+=f(O,r);return t}},x={};x.fetch=async function(e){return await i("customers/"+e)};x.fetchAll=async function(){return await i("customers")};x.save=async function(e){return await E("customers",e)};const N=await fetch("src/ui/customer/template.html"),I=await N.text();let z={render:function(e){let t="";Array.isArray(e)||(e=[e]);for(let r of e)t+=f(I,r);return t}};const k=await fetch("src/ui/month/template.html"),W=await k.text();let K={render:function(e){let t="";Array.isArray(e)||(e=[e]);for(let r of e)t+=f(W,r);return t}},s={};s.init=async function(){n.init()};let n={movies:document.querySelector("#movie"),top3:document.querySelector("#top"),topRentals:document.querySelector("#topRentals"),evolution:document.querySelector("#evolution"),genre:document.querySelector("#genre"),country:document.querySelector("#country"),history:document.querySelector("#historySelect"),customerName:document.querySelector("#customerName"),month:document.querySelector("#month"),monthData:document.querySelector("#monthData"),conso:document.querySelector("#conso")};n.init=async function(){s.loadTop(),s.loadMovies(),s.loadEvolution(),s.loadGenre(),s.loadCountry(),s.loadHistory(),s.loadCustomer(),await s.loadMonth(),s.loadConsommation(),s.loadConso()};s.loadMovies=async function(){try{let e=await m.getTotalSales(),t=await y.getRentalSales();n.renderMovies(e,t)}catch(e){console.error("Error loading movies:",e)}};n.renderMovies=function(e,t){n.movies.innerHTML=L.render(e,t);const o=new Date().toISOString().slice(0,7);var a={series:[{name:"sales",data:[{x:"Top vente du "+o,y:e,fillColor:"#008FFB"},{x:"Top location du "+o,y:t,fillColor:"#00E396"}]}],chart:{type:"bar",height:403.75},xaxis:{type:"category",labels:{fontWeight:700},categories:["Ventes","Locations"]},title:{text:"Montant total des ventes et le montant total des locations pour le mois en cours"},yaxis:{labels:{formatter:function(c){return c+" €"}}}},l=new ApexCharts(document.querySelector("#chart"),a);l.render()};s.loadTop=async function(){try{let e=await d.getTop3(),t=e.slice(0,3),r=e.slice(3);n.renderTop(t,r)}catch(e){console.error("Error loading top movies:",e)}};n.renderTop=function(e,t){n.top3.innerHTML=b.render(e),n.topRentals.innerHTML=b.render(t)};s.loadEvolution=async function(){try{let e=await y.getRentalsEvolution(),t=await m.getSalesEvolution();n.renderEvolution(e,t)}catch(e){console.error("Error loading evolution:",e)}};n.renderEvolution=function(e,t){n.evolution.innerHTML=j.render(e,t);var r={series:[{name:"Evolution des locations",data:e.map(a=>a.total_rentals).reverse()},{name:"Evolution des ventes",data:t.map(a=>a.total_sales).reverse()}],chart:{height:350,type:"line",zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"straight"},title:{text:"Ventes et location lors des 6 derniers mois",align:"left"},grid:{row:{colors:["#f3f3f3","transparent"],opacity:.5}},xaxis:{categories:e.map(a=>a.month).reverse()}},o=new ApexCharts(document.querySelector("#chartEvo"),r);o.render()};s.loadGenre=async function(){let e=document.querySelector("#genreSelect").value;if(e==="sales"){let t=await m.salesGenreEvolution();n.renderGenre(t,[])}else if(e==="rentals"){let t=await y.rentalGenreEvolution();n.renderGenre([],t)}else{let t=await m.salesGenreEvolution(),r=await y.rentalGenreEvolution();n.renderGenre(t,r)}};n.renderGenre=function(e,t){n.genre.innerHTML=_.render();let r=e.concat(t);var o=["Animation","Comedy","Drama","Sci-Fi","Thriller","Action","Romance","Horror"],a=[...new Set(r.map(u=>u.month))].sort(),l=o.map((u,p)=>({name:u,data:a.map(w=>{var C=r.find(A=>A.genre==u&&A.month==w);return C?C.total_sales||C.total_rentals:0}),color:c(p)}));function c(u){var p=["#008FFB","#00E396","#775DD0","#FEB019","#FF4560","#A2A2A4","#8D6E63","#E9EB58"];return p[u%p.length]}var h={series:l,chart:{type:"bar",height:350,stacked:!0},plotOptions:{bar:{horizontal:!0,dataLabels:{total:{enabled:!0,style:{fontSize:"13px",fontWeight:900}}}}},stroke:{width:1,colors:["#fff"]},title:{text:"Ventes et locations par genre lors des 6 derniers mois"},xaxis:{categories:a,labels:{formatter:function(u){return u}}},yaxis:{title:{text:void 0}},tooltip:{y:{formatter:function(u){return u}}},fill:{opacity:1},legend:{position:"top",horizontalAlign:"left",offsetX:40}},v=new ApexCharts(document.querySelector("#chartGenre"),h);v.render()};document.querySelector("#genreSelect").addEventListener("change",s.loadGenre);s.loadCountry=async function(){try{let e=await m.SalesByCountry(),t=await y.RentalsByCountry();n.renderCountry(e,t)}catch(e){console.error("Error loading country:",e)}};n.renderCountry=function(e,t){var r={series:[{name:"Sales",data:e.map(o=>({x:o.country,y:o.total_sales}))},{name:"Rentals",data:t.map(o=>({x:o.country,y:o.total_rentals}))}],legend:{show:!1},chart:{height:350,type:"treemap"},title:{text:"Vente et location par pays"}};n.chart?n.chart.updateOptions(r):(n.chart=new ApexCharts(document.querySelector("#countryData"),r),n.chart.render())};let g;s.loadHistory=async function(){let e=document.querySelector("#historySelect").value;(!e||e==="0")&&(e="Love Is All There Is");try{let t=await d.historyByTitle(e),r=[];(!e||e==="Love Is All There Is")&&(r=await d.fetchAll()),n.renderHistory(t,r)}catch(t){console.error("Error loading history:",t)}};n.renderHistory=function(e,t){n.history.innerHTML||(n.history.innerHTML=V.render(t));let r=document.querySelector("#historySelect").value,o=e.map(c=>c.rentals_count),a=e.map(c=>c.sales_count);var l={series:[{name:"Evolution des locations",data:o},{name:"Evolution des ventes",data:a}],chart:{height:350,type:"line",zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"straight"},title:{text:"Ventes et locations pour "+r,align:"left"},grid:{row:{colors:["#f3f3f3","transparent"],opacity:.5}},xaxis:{categories:e.map(c=>c.month)}};g&&g.destroy(),g=new ApexCharts(document.querySelector("#history"),l),g.render()};document.querySelector("#historySelect").addEventListener("change",s.loadHistory);s.loadCustomer=async function(){let e=document.querySelector("#customerName").value;(!e||e==="0")&&(e="1");try{let t=await d.movieCustomer(e),r=[];document.querySelector("#customerName").value||(r=await x.fetchAll()),n.renderCustomer(t,r)}catch(t){console.error("Error loading customers:",t)}};let S;n.renderCustomer=function(e,t){n.customerName.innerHTML||(n.customerName.innerHTML=z.render(t));let r=e.reduce((a,l)=>(a[l.genre]=(a[l.genre]||0)+1,a),{});var o={series:Object.values(r),chart:{width:380,type:"pie"},labels:Object.keys(r),tooltip:{y:{formatter:function(a,{series:l,seriesIndex:c,dataPointIndex:h,w:v}){let u=Object.keys(r)[h],p=e.filter(w=>w.genre===u).map(w=>w.movie_title).join(`,
`);return u+": "+a+" ("+p+")"}}},responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}]};S&&S.destroy(),S=new ApexCharts(document.querySelector("#customer"),o),S.render()};document.querySelector("#customerName").addEventListener("change",s.loadCustomer);s.loadMonth=async function(){try{let e=await d.getMonth();n.renderMonth(e)}catch(e){console.error("Error loading month:",e)}};n.renderMonth=function(e){n.month.innerHTML=K.render(e)};s.loadConsommation=async function(){let e=document.querySelector("#month").value;try{let t=await d.movieConsoParPays(e);n.renderConsommation(t)}catch(t){console.error("Error loading country:",t)}};n.renderConsommation=function(e){n.monthData.innerHTML="";var t={series:[{name:"Series 1",data:e.map(o=>o.total_gb_consumed)}],chart:{height:350,type:"radar"},title:{text:"Co2 consommé par pays le "+document.querySelector("#month").value},yaxis:{stepSize:20},xaxis:{categories:e.map(o=>o.country)}},r=new ApexCharts(document.querySelector("#monthData"),t);r.render()};document.querySelector("#month").addEventListener("change",s.loadConsommation);s.loadConso=async function(){try{let e=[],t=[];const r=["Austria","Denmark","France","Germany","Greece","Portugal","Sweden","United Kingdom","Spain"];for(let o=0;o<12;o++){let a=new Date;a.setMonth(a.getMonth()-o);let l=a.toISOString().slice(0,7);t.push(l);let c=await d.movieConsoParPays(l);r.forEach(h=>{let v=c.find(u=>u.country===h);e.push({country:h,name:l,data:v?v.total_gb_consumed:0})})}e=e.reverse(),n.renderConso(e)}catch(e){console.error("Error loading consumption data:",e)}};n.renderConso=function(e){var t={series:e.reduce((o,a)=>{let l=o.find(c=>c.name===a.country);return l||(l={name:a.country,data:[]},o.push(l)),l.data.push({x:a.name,y:a.data}),o},[]),chart:{height:350,type:"heatmap"},dataLabels:{enabled:!1},colors:["#008FFB"],title:{text:"Go consommé par pays"},xaxis:{type:"category",categories:[...new Set(e.map(o=>o.name))].sort(),title:{text:"Date"}},yaxis:{title:{text:"Pays"}}},r=new ApexCharts(document.querySelector("#conso"),t);r.render()};s.init();