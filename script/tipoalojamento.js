
////Adicionar basemap
let baseoriginal =L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'});
///'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
///'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'


//adicionar mapa
let latitude = 41.12073;
let longitude = -8.5147;
let zoom = 9;
var map= L.map(document.getElementById('mapDIV'),{ 
    center:[latitude,longitude],
    zoom: zoom,
    zoomControl:false,
    attributionControl:true,/// LEAFLET EM BAIXO A APARECER
    maxZoom:9,
    minZoom:9,
    dragging:false,
});
baseoriginal.addTo(map);

///// --- Adicionar Layer dos Concelhos -----\\\\
function layerContorno() {
    return {
        weight: 1.5,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.3,
        linejoin: 'round',
        fillColor:'rgb(204,204,204)'};
    }
var contorno = L.geoJSON(contornoAmp,{
    style:layerContorno,
});
contorno.addTo(map);
///// ---- Fim layer Concelhos --- \\\\

///// --- Adicionar Layer das Freguesias -----\\\\
var contornoFreg = L.geoJSON(contornoFreguesias,{
    style:layerContorno,
});
///// ---- Fim layer Freguesias --- \\\\
//// ---- Botão de aproximar e diminuir a escala e voltar ao zoom inicial---- \\\\\
// var zoomHome = L.Control.zoomHome({
//     position:'topleft',
//     zoomHomeTitle: 'Zoom Inicial',
//     zoomInTitle: 'Aumentar',
//     zoomOutTitle: 'Diminuir'
// }).addTo(map);
L.control.scale({
    imperial:false,
///    maxWidth:100, TAMANHO DA ESCALA
}).addTo(map);

///percentagemConcelho


/////Buscar os ID'S todos \\\\\

let space = document.getElementById("space");
let opcoesTabela = document.getElementById('opcoesTabela');
let barraTabela = document.getElementById('barraTabela');
let escalasConcelho = document.getElementById('escalasConcelho');
let escalasFreguesia = document.getElementById('escalasFreguesias');
let absolutoConcelho = document.getElementById('absoluto');
let absolutoFreguesia = document.getElementById('absolutoFreguesia');
let variacaoConcelho = document.getElementById('taxaVariacao');
let variacaoFreguesia = document.getElementById('taxaVariacaoFreguesia');
let percentagemConcelhos = document.getElementById('percentagem');
let percentagemFreguesia = document.getElementById('percentagemFreguesia');
let opcao = document.getElementById('concelho');
let divFreguesias = document.getElementById('freguesias');
let filtrar = document.getElementById('filtrar');
let painel = document.getElementById('painel');
let mapDIV = document.getElementById('mapDIV');
let myDIV = document.getElementById('myDIV');
let legendaA= document.getElementById('legendaA');
let painelLegenda= document.getElementById('painelLegenda');
let tabela= document.getElementById('tabela');
let grafico= document.getElementById('grafico');
var ifSlide2isActive = 1;
let slidersGeral = document.getElementById('slidersGeral');
let tiposAlojamento = document.getElementById('example-select');
let inputNumberMin = document.getElementById('input-number-min');
let inputNumberMax = document.getElementById('input-number-max');
let tabelaTipoAlojamentoDadosAbsolutos = document.getElementById('tabelaPopResidente');
let tabelaVariacao = document.getElementById('tabelaVariacao');
let tabelaPercentagem = document.getElementById('tabelaPercentagem');
let esconderano2001 = document.getElementById('2001')





///// --- Botões secundários (Concelho, Freguesia) ficarem ativos sempre que se clica \\\\\
var btns = myDIV.getElementsByClassName("butaoEscala");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active2");
  current[0].className = current[0].className.replace(" active2", "");
  this.className += " active2";
  });
}

///// --- Botões das tabelas (Absoluto, Variação, Percentagem) ficarem ativos sempre que se clica \\\\\
var btns1 = opcoesTabela.getElementsByClassName("btn");
for (var i = 0; i < btns1.length; i++) {
  btns1[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active1");
  current[0].className = current[0].className.replace(" active1", "");
  this.className += " active1";
  });
}

///// --- Botões iniciais (Mapa, Gráfico, Escala) ficarem ativos sempre que se clica \\\\\
var btns2 = space.getElementsByClassName("btn");
for (var i = 0; i < btns2.length; i++) {
  btns2[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active3");
  current[0].className = current[0].className.replace(" active3", "");
  this.className += " active3";
  });
}

///// --- Botões das variáveis  dos Concelhos(Número Absoluto, Taxa de Variação, Percentagem) ficarem ativos sempre que se clica \\\\\

var btns3 = escalasConcelho.getElementsByClassName("butao");
for (var i = 0; i < btns3.length; i++) {
    btns3[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active4");
    current[0].className = current[0].className.replace(" active4", "");
    this.className += " active4";
  });
}
///// --- Botões das variáveis das Freguesias (Número Absoluto, Taxa de Variação, Percentagem) ficarem ativos sempre que se clica \\\\\
var btns4 = escalasFreguesia.getElementsByClassName("butao");
for (var i = 0; i < btns4.length; i++) {
  btns4[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active5");
  current[0].className = current[0].className.replace(" active5", "");
  this.className += " active5";
  });
}


///// Número Total de Alojamentos em 2021  - Concelhos
// var totalAlojamentos21;
// function getRadius(area) {
//     var radius =  Math.sqrt((area/1000) / Math.PI);
//     return radius * 5;
// };

//ORIGINAL 

function getRadius(area, multiplicao) {
    var radius = Math.sqrt(area / Math.PI);
    return radius * multiplicao;
};





var min = 0;
var max = 0;
function estilototalAlojamentos21(feature, latlng) {
    if(feature.properties.Total2021< min || min ===0){
        min = feature.properties.Total2021
    }
    if(feature.properties.Total2021> max){
        max = feature.properties.Total2021
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.Total2021,0.1)
    });
}
function apagartotalAlojamentos21(e){
    var layer = e.target;
    totalAlojamentos21.resetStyle(layer)
    layer.closePopup();
}
function highlightTotalAlojamentos21(e) {
    var layer = e.target;
    layer.openPopup();
    infoTotalAlojamentos21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureTotalAlojamentos21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Alojamentos: ' + '<b>' +feature.properties.Total2021 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightTotalAlojamentos21, 
        mouseout:apagartotalAlojamentos21,
    })
};
let infoTotalAlojamentos21 = L.control();

infoTotalAlojamentos21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoTotalAlojamentos21.update = function (feature) {
    this._div.innerHTML = '<h4>Total de Alojamentos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.Total2021 +
    ' alojamentos </sup>': '');
};
infoTotalAlojamentos21.addTo(map);
totalAlojamentos21= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estilototalAlojamentos21,
    onEachFeature: onEachFeatureTotalAlojamentos21,
});
totalAlojamentos21.addTo(map)  

var legenda = function(tituloescrito, maximo,medio,minimo, multiplicador) {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'center'
    var symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = tituloescrito
    var	classes = [maximo, medio,minimo];
    var	legendCircle;
    var	lastRadius = 0;
    var currentRadius;
    var margin;
    


    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")
    for (var i = 0; i <= classes.length-1; i++) {
        
        legendCircle = document.createElement("div");
        legendCircle.className = 'legendCircle'

            currentRadius = getRadius(classes[i],multiplicador);

            margin = -currentRadius - lastRadius - 2;

            $(legendCircle).attr("style", "width: " + currentRadius*2 +
                "px; height: " + currentRadius*2 +
                "px; margin-left: " + margin + "px" );

            $(legendCircle).append("<span class='legendValue'>"+classes[i]+"<span>");

            $(symbolsContainer).append(legendCircle);

            lastRadius = currentRadius;

        }
        $(legendaA).append(symbolsContainer);
        legendaA.style.visibility = "visible"
        }
legenda('Nº de Alojamentos em 2021',max, (max-min)/2,min,0.1);

var sliderAtivo = null

var slideTotalAlojamentos21 = function(){
    var sliderTotalAlojamentos21 = document.querySelector('.sliderAtivo');

    
    if (ifSlide2isActive != 1){
        sliderAtivo.destroy();
    } 

    noUiSlider.create(sliderTotalAlojamentos21, {
        start: [min, max],
        tooltips:true,
        connect: true,
        range: {
            'min': min,
            'max': max
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",min);
    inputNumberMax.setAttribute("value",max);

    inputNumberMin.addEventListener('change', function(){
        sliderTotalAlojamentos21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderTotalAlojamentos21.noUiSlider.set([null, this.value]);
    });

    sliderTotalAlojamentos21.noUiSlider.on('update',function(e){
        totalAlojamentos21.eachLayer(function(layer){
            if(layer.feature.properties.Total2021>=parseFloat(e[0])&& layer.feature.properties.Total2021 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    sliderTotalAlojamentos21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 1;
    sliderAtivo = sliderTotalAlojamentos21.noUiSlider;
    $(slidersGeral).append(sliderTotalAlojamentos21);
}
slideTotalAlojamentos21();


///// FIM Número Total de Alojamentos em 2021 \\\\\\

///// Número Total de Alojamentos de Concelhos em 2011 \\\\\
var totalAlojamentos11Concelhos;

var minTotalAlojamentos11Concelhos = 0;
var maxTotalAlojamentos11Concelhos = 0;
function estiloTotalAlojamentos11Concelhos(feature, latlng) {
    if(feature.properties.Total2011< minTotalAlojamentos11Concelhos || minTotalAlojamentos11Concelhos ===0){
        minTotalAlojamentos11Concelhos = feature.properties.Total2011
    }
    if(feature.properties.Total2011> maxTotalAlojamentos11Concelhos){
        maxTotalAlojamentos11Concelhos = feature.properties.Total2011
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.Total2011,0.1)
    });
}
function apagarTotalAlojamentos11Concelhos(e){
    var layer = e.target;
    totalAlojamentos11Concelhos.resetStyle(layer)
    layer.closePopup();
}
function highlightTotalAlojamentos11Concelhos(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoTotalAlojamentos11Concelhos.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureTotalAlojamentos11Concelhos(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Alojamentos: ' + '<b>' +feature.properties.Total2011 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightTotalAlojamentos11Concelhos, 
        mouseout:apagarTotalAlojamentos11Concelhos,
    })
};
let infoTotalAlojamentos11Concelhos = L.control();

infoTotalAlojamentos11Concelhos.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoTotalAlojamentos11Concelhos.update = function (feature) {
    this._div.innerHTML = '<h4>Total de Alojamentos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.Total2011 +
    ' Alojamentos </sup>': '');
};

totalAlojamentos11Concelhos= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloTotalAlojamentos11Concelhos,
    onEachFeature: onEachFeatureTotalAlojamentos11Concelhos,
});


var slidetotalAlojamentos11Concelhos = function(){
    var slidertotalAlojamentos11Concelhos = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 6){
        sliderAtivo.destroy();
    }

    noUiSlider.create(slidertotalAlojamentos11Concelhos, {
        start: [minTotalAlojamentos11Concelhos, maxTotalAlojamentos11Concelhos],
        tooltips:true,
        connect: true,
        range: {
            'min': minTotalAlojamentos11Concelhos,
            'max': maxTotalAlojamentos11Concelhos
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minTotalAlojamentos11Concelhos);
    inputNumberMax.setAttribute("value",maxTotalAlojamentos11Concelhos);

    inputNumberMin.addEventListener('change', function(){
        slidertotalAlojamentos11Concelhos.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        slidertotalAlojamentos11Concelhos.noUiSlider.set([null, this.value]);
    });

    slidertotalAlojamentos11Concelhos.noUiSlider.on('update',function(e){
        totalAlojamentos11Concelhos.eachLayer(function(layer){
            if(layer.feature.properties.Total2011>=parseFloat(e[0])&& layer.feature.properties.Total2011 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        slidertotalAlojamentos11Concelhos.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 6;
    sliderAtivo = slidertotalAlojamentos11Concelhos.noUiSlider;
    $(slidersGeral).append(slidertotalAlojamentos11Concelhos);
}


////// ---- Fim  Número Total de Alojamentos de Concelhos em 2011 -----\\\\

//// Número de Alojamentos Familiares  em 2021 \\\\\\
var AlojamentosFamiliares2021;

var minAlojaFam2021 = 0;
var maxAlojaFam2021 = 0;

function estiloAlojamentosFamiliares2021(feature, latlng) {
    if(feature.properties.AlojFami21< minAlojaFam2021 || minAlojaFam2021 ===0){
        minAlojaFam2021 = feature.properties.AlojFami21
    }
    if(feature.properties.AlojFami21> maxAlojaFam2021){
        maxAlojaFam2021 = feature.properties.AlojFami21
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.AlojFami21,0.1)
    });
}
function apagarAlojamentosFamiliares2021(e){
    var layer = e.target;
    AlojamentosFamiliares2021.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojamentosFamiliares2021(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojamentosFamiliares2021.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojamentosFamiliares2021(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Alojamentos Familiares: ' + '<b>' +feature.properties.AlojFami21 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojamentosFamiliares2021, 
        mouseout:apagarAlojamentosFamiliares2021,
    })
};
let infoAlojamentosFamiliares2021 = L.control();

infoAlojamentosFamiliares2021.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojamentosFamiliares2021.update = function (feature) {
    this._div.innerHTML = '<h4>Alojamentos Familiares em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AlojFami21 +
    ' Alojamentos </sup>': '');
};

AlojamentosFamiliares2021= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloAlojamentosFamiliares2021,
    onEachFeature: onEachFeatureAlojamentosFamiliares2021,
});


var slideAlojamentosFamiliares2021 = function(){
    var sliderAlojamentosFamiliares2021 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 7){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojamentosFamiliares2021, {
        start: [minAlojaFam2021, maxAlojaFam2021],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojaFam2021,
            'max': maxAlojaFam2021
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojaFam2021);
    inputNumberMax.setAttribute("value",maxAlojaFam2021);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojamentosFamiliares2021.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojamentosFamiliares2021.noUiSlider.set([null, this.value]);
    });

    sliderAlojamentosFamiliares2021.noUiSlider.on('update',function(e){
        AlojamentosFamiliares2021.eachLayer(function(layer){
            if(layer.feature.properties.AlojFami21>=parseFloat(e[0])&& layer.feature.properties.AlojFami21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojamentosFamiliares2021.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 7;
    sliderAtivo = sliderAlojamentosFamiliares2021.noUiSlider;
    $(slidersGeral).append(sliderAlojamentosFamiliares2021);
}

////// ---- Fim Número Alojamentos Familiares por Concelho 2021 -----\\\\

//// Número de Alojamentos Familiares em 2011 \\\\\\
var AlojamentosFamiliares2011;

var minAlojamentosFamiliares11 = 0;
var maxAlojamentosFamiliares11 = 0;
function estiloAlojamentosFamiliares2011(feature, latlng) {
    if(feature.properties.AlojFami11< minAlojamentosFamiliares11 || minAlojamentosFamiliares11 ===0){
        minAlojamentosFamiliares11 = feature.properties.AlojFami11
    }
    if(feature.properties.AlojFami11> maxAlojamentosFamiliares11){
        maxAlojamentosFamiliares11 = feature.properties.AlojFami11
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.AlojFami11,0.1)
    });
}
function apagarAlojamentosFamiliares2011(e){
    var layer = e.target;
    AlojamentosFamiliares2011.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojamentosFamiliares2011(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojamentosFamiliares2011.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojamentosFamiliares2011(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Residentes: ' + '<b>' +feature.properties.AlojFami11 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojamentosFamiliares2011, 
        mouseout:apagarAlojamentosFamiliares2011,
    })
};
let infoAlojamentosFamiliares2011 = L.control();

infoAlojamentosFamiliares2011.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojamentosFamiliares2011.update = function (feature) {
    this._div.innerHTML = '<h4>Alojamentos Familiares em 2011 </h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AlojFami11 +
    ' Alojamentos Familiares </sup>': '');
};

AlojamentosFamiliares2011= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloAlojamentosFamiliares2011,
    onEachFeature: onEachFeatureAlojamentosFamiliares2011,
});


var slideAlojamentosFamiliares2011 = function(){
    var sliderAlojamentosFamiliares2011 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 8){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojamentosFamiliares2011, {
        start: [minAlojamentosFamiliares11, maxAlojamentosFamiliares11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojamentosFamiliares11,
            'max': maxAlojamentosFamiliares11
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojamentosFamiliares11);
    inputNumberMax.setAttribute("value",maxAlojamentosFamiliares11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojamentosFamiliares2011.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojamentosFamiliares2011.noUiSlider.set([null, this.value]);
    });

    sliderAlojamentosFamiliares2011.noUiSlider.on('update',function(e){
        AlojamentosFamiliares2011.eachLayer(function(layer){
            if(layer.feature.properties.AlojFami11>=parseFloat(e[0])&& layer.feature.properties.AlojFami11 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    sliderAlojamentosFamiliares2011.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 8;
    sliderAtivo = sliderAlojamentosFamiliares2011.noUiSlider;
    $(slidersGeral).append(sliderAlojamentosFamiliares2011);
}

///// Fim Número de Alojamentos Familiares em 2011 por Concelho \\\\\\

//////------- Número de Alojamentos Familiares Clássicos em 2021 por Concelho -----////
var minAlojFamiClass21 = 0;
var maxAlojFamiClass21 = 0;;
function estiloalojaFamClass2021(feature, latlng) {
    if(feature.properties.ALclass21< minAlojFamiClass21 || minAlojFamiClass21 ===0){
        minAlojFamiClass21 = feature.properties.ALclass21
    }
    if(feature.properties.ALclass21> maxAlojFamiClass21){
        maxAlojFamiClass21 = feature.properties.ALclass21
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALclass21,0.1)
    });
}
function apagaralojaFamClass2021(e){
    var layer = e.target;
    alojaFamClass2021.resetStyle(layer)
    layer.closePopup();
}
function highlightalojaFamClass2021(e) {
    var layer = e.target;
    layer.openPopup();
    infoalojaFamClass2021.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeaturealojaFamClass2021(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Residentes: ' + '<b>' +feature.properties.ALclass21 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightalojaFamClass2021, 
        mouseout:apagaralojaFamClass2021,
    })
};
let infoalojaFamClass2021 = L.control();

infoalojaFamClass2021.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoalojaFamClass2021.update = function (feature) {
    this._div.innerHTML = '<h4>Alojamentos Familiares Clássicos em 2021 </h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.ALclass21 +
    ' Alojamentos Familiares Clássicos </sup>': '');
};

alojaFamClass2021= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloalojaFamClass2021,
    onEachFeature: onEachFeaturealojaFamClass2021,
});


var slidealojaFamClass2021 = function(){
    var slideralojaFamClass2021 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 4){
        sliderAtivo.destroy();
    }

    noUiSlider.create(slideralojaFamClass2021, {
        start: [minAlojFamiClass21, maxAlojFamiClass21],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiClass21,
            'max': maxAlojFamiClass21
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojFamiClass21);
    inputNumberMax.setAttribute("value",maxAlojFamiClass21);

    inputNumberMin.addEventListener('change', function(){
        slideralojaFamClass2021.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        slideralojaFamClass2021.noUiSlider.set([null, this.value]);
    });

    slideralojaFamClass2021.noUiSlider.on('update',function(e){
        alojaFamClass2021.eachLayer(function(layer){
            if(layer.feature.properties.ALclass21>=parseFloat(e[0])&& layer.feature.properties.ALclass21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    slideralojaFamClass2021.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 4;
    sliderAtivo = slideralojaFamClass2021.noUiSlider;
    $(slidersGeral).append(slideralojaFamClass2021);
}


///// Fim dos Alojamentos Familiares Clássicos em 2021-------------- \\\\\\


///// ------------- Alojamentos Familiares Clássicos em 2011-------------- \\\\\\

var minAlojFamiClass11 = 0;
var maxAlojFamiClass11 = 0;;
function estiloalojaFamClass2011(feature, latlng) {
    if(feature.properties.ALclass11< minAlojFamiClass11 || minAlojFamiClass11 ===0){
        minAlojFamiClass11 = feature.properties.ALclass11
    }
    if(feature.properties.ALclass11> maxAlojFamiClass11){
        maxAlojFamiClass11 = feature.properties.ALclass11
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALclass11,0.1)
    });
}
function apagaralojaFamClass2011(e){
    var layer = e.target;
    alojaFamClass2011.resetStyle(layer)
    layer.closePopup();
}
function highlightalojaFamClass2011(e) {
    var layer = e.target;
    layer.openPopup();
    infoalojaFamClass2011.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeaturealojaFamClass2011(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Residentes: ' + '<b>' +feature.properties.ALclass11 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightalojaFamClass2011, 
        mouseout:apagaralojaFamClass2011,
    })
};
let infoalojaFamClass2011 = L.control();

infoalojaFamClass2011.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoalojaFamClass2011.update = function (feature) {
    this._div.innerHTML = '<h4>Alojamentos Familiares Clássicos em 2011 </h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.ALclass11 +
    ' Alojamentos Familiares Clássicos </sup>': '');
};

var alojaFamClass2011= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloalojaFamClass2011,
    onEachFeature: onEachFeaturealojaFamClass2011,
});


var slidealojaFamClass2011 = function(){
    var slideralojaFamClass2011 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 9){
        sliderAtivo.destroy();
    }

    noUiSlider.create(slideralojaFamClass2011, {
        start: [minAlojFamiClass11, maxAlojFamiClass11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiClass11,
            'max': maxAlojFamiClass11
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojFamiClass11);
    inputNumberMax.setAttribute("value",maxAlojFamiClass11);

    inputNumberMin.addEventListener('change', function(){
        slideralojaFamClass2011.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        slideralojaFamClass2011.noUiSlider.set([null, this.value]);
    });

    slideralojaFamClass2011.noUiSlider.on('update',function(e){
        alojaFamClass2011.eachLayer(function(layer){
            if(layer.feature.properties.ALclass11>=parseFloat(e[0])&& layer.feature.properties.ALclass11 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    slideralojaFamClass2011.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 9;
    sliderAtivo = slideralojaFamClass2011.noUiSlider;
    $(slidersGeral).append(slideralojaFamClass2011);
}
///// ------------- Fim Alojamentos Familiares Clássicos em 2011-------------- \\\\\\

///// ------- Alojamentos Familiares Não Clássicos em 2021 ---------- \\\\

var minAlojFamiNaoClass21 = 0;
var maxAlojFamiNaoClass21 = 0;;
function estiloalojaFamNaoClass2021(feature, latlng) {
    if(feature.properties.ALnclass21< minAlojFamiNaoClass21 || minAlojFamiNaoClass21 ===0){
        minAlojFamiNaoClass21 = feature.properties.ALnclass21
    }
    if(feature.properties.ALnclass21> maxAlojFamiNaoClass21){
        maxAlojFamiNaoClass21 = feature.properties.ALnclass21
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALnclass21,2)
    });
}
function apagaralojaFamNaoClass2021(e){
    var layer = e.target;
    alojaFamNaoClass2021.resetStyle(layer)
    layer.closePopup();
}
function highlightalojaFamNaoClass2021(e) {
    var layer = e.target;
    layer.openPopup();
    infoalojaFamNaoClass2021.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeaturealojaFamNaoClass2021(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Alojamentos Familiares Não Clássicos: ' + '<b>' +feature.properties.ALnclass21 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightalojaFamNaoClass2021, 
        mouseout:apagaralojaFamNaoClass2021,
    })
};
let infoalojaFamNaoClass2021 = L.control();

infoalojaFamNaoClass2021.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoalojaFamNaoClass2021.update = function (feature) {
    this._div.innerHTML = '<h4>Alojamentos Familiares Não Clássicos em 2021 </h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.ALclass11 +
    ' Alojamentos Familiares Não Clássicos </sup>': '');
};

var alojaFamNaoClass2021= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloalojaFamNaoClass2021,
    onEachFeature: onEachFeaturealojaFamNaoClass2021,
});


var slidealojaFamNaoClass2021 = function(){
    var slideralojaFamNaoClass2021 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 18){
        sliderAtivo.destroy();
    }

    noUiSlider.create(slideralojaFamNaoClass2021, {
        start: [minAlojFamiNaoClass21, maxAlojFamiNaoClass21],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiNaoClass21,
            'max': maxAlojFamiNaoClass21
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojFamiClass21);
    inputNumberMax.setAttribute("value",maxAlojFamiNaoClass21);

    inputNumberMin.addEventListener('change', function(){
        slideralojaFamNaoClass2021.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        slideralojaFamNaoClass2021.noUiSlider.set([null, this.value]);
    });

    slideralojaFamNaoClass2021.noUiSlider.on('update',function(e){
        alojaFamNaoClass2021.eachLayer(function(layer){
            if(layer.feature.properties.ALnclass21>=parseFloat(e[0])&& layer.feature.properties.ALnclass21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    slideralojaFamNaoClass2021.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 18;
    sliderAtivo = slideralojaFamNaoClass2021.noUiSlider;
    $(slidersGeral).append(slideralojaFamNaoClass2021);
}
///// ------- Alojamentos Familiares Não Clássicos em 2011 ---------- \\\\

var minAlojFamiNaoClass11 = 0;
var maxAlojFamiNaoClass11 = 0;;
function estiloalojaFamNaoClass2011(feature, latlng) {
    if(feature.properties.ALnclass11< minAlojFamiNaoClass11 || minAlojFamiNaoClass11 ===0){
        minAlojFamiNaoClass11 = feature.properties.ALnclass11
    }
    if(feature.properties.ALnclass11> maxAlojFamiNaoClass11){
        maxAlojFamiNaoClass11 = feature.properties.ALnclass11
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALnclass11,2)
    });
}
function apagaralojaFamNaoClass2011(e){
    var layer = e.target;
    alojaFamNaoClass2011.resetStyle(layer)
    layer.closePopup();
}
function highlightalojaFamNaoClass2011(e) {
    var layer = e.target;
    layer.openPopup();
    infoalojaFamNaoClass2011.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeaturealojaFamNaoClass2011(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Alojamentos Familiares Não Clássicos: ' + '<b>' +feature.properties.ALnclass11 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightalojaFamNaoClass2011, 
        mouseout:apagaralojaFamNaoClass2011,
    })
};
let infoalojaFamNaoClass2011 = L.control();

infoalojaFamNaoClass2011.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoalojaFamNaoClass2011.update = function (feature) {
    this._div.innerHTML = '<h4>Alojamentos Familiares Não Clássicos em 2011 </h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.ALnclass11 +
    ' Alojamentos Familiares Não Clássicos </sup>': '');
};

var alojaFamNaoClass2011= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloalojaFamNaoClass2011,
    onEachFeature: onEachFeaturealojaFamNaoClass2011,
});


var slidealojaFamNaoClass2011 = function(){
    var slideralojaFamNaoClass2011 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 17){
        sliderAtivo.destroy();
    }

    noUiSlider.create(slideralojaFamNaoClass2011, {
        start: [minAlojFamiNaoClass11, maxAlojFamiNaoClass11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiNaoClass11,
            'max': maxAlojFamiNaoClass11
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojFamiClass21);
    inputNumberMax.setAttribute("value",maxAlojFamiNaoClass11);

    inputNumberMin.addEventListener('change', function(){
        slideralojaFamNaoClass2011.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        slideralojaFamNaoClass2011.noUiSlider.set([null, this.value]);
    });

    slideralojaFamNaoClass2011.noUiSlider.on('update',function(e){
        alojaFamNaoClass2011.eachLayer(function(layer){
            if(layer.feature.properties.ALnclass11>=parseFloat(e[0])&& layer.feature.properties.ALnclass11 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    slideralojaFamNaoClass2011.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 17;
    sliderAtivo = slideralojaFamNaoClass2011.noUiSlider;
    $(slidersGeral).append(slideralojaFamNaoClass2011);
}
////-------- Fim dos Alojamentos Familiares Não Clássicos em 2011 ----------\\\\\\\\\\

///// ------- Alojamentos Familiares Coletivos em 2021 ---------- \\\\

var minAlojFamiColetivos21 = 0;
var maxAlojFamiColetivos21 = 0;;
function estiloAlojaFamColetivos21(feature, latlng) {
    if(feature.properties.ALcole21< minAlojFamiColetivos21 || minAlojFamiColetivos21 ===0){
        minAlojFamiColetivos21 = feature.properties.ALcole21
    }
    if(feature.properties.ALcole21> maxAlojFamiColetivos21){
        maxAlojFamiColetivos21 = feature.properties.ALcole21
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALcole21,2)
    });
}
function apagarAlojaFamColetivos21(e){
    var layer = e.target;
    AlojaFamColetivos21.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojaFamColetivos21(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojaFamColetivos21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojaFamColetivos21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Alojamentos Coletivos: ' + '<b>' +feature.properties.ALcole21 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojaFamColetivos21, 
        mouseout:apagarAlojaFamColetivos21,
    })
};
let infoAlojaFamColetivos21 = L.control();

infoAlojaFamColetivos21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojaFamColetivos21.update = function (feature) {
    this._div.innerHTML = '<h4>Alojamentos Coletivos em 2021 </h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.ALcole21 +
    ' Alojamentos Coletivos </sup>': '');
};

var AlojaFamColetivos21= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloAlojaFamColetivos21,
    onEachFeature: onEachFeatureAlojaFamColetivos21,
});


var slideAlojaFamColetivos21 = function(){
    var sliderAlojaFamColetivos21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 5){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojaFamColetivos21, {
        start: [minAlojFamiColetivos21, maxAlojFamiColetivos21],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiColetivos21,
            'max': maxAlojFamiColetivos21
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojFamiColetivos21);
    inputNumberMax.setAttribute("value",maxAlojFamiColetivos21);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojaFamColetivos21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojaFamColetivos21.noUiSlider.set([null, this.value]);
    });

    sliderAlojaFamColetivos21.noUiSlider.on('update',function(e){
        AlojaFamColetivos21.eachLayer(function(layer){
            if(layer.feature.properties.ALcole21>=parseFloat(e[0])&& layer.feature.properties.ALcole21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    sliderAlojaFamColetivos21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 5;
    sliderAtivo = sliderAlojaFamColetivos21.noUiSlider;
    $(slidersGeral).append(sliderAlojaFamColetivos21);
}
////-------- Fim dos Alojamentos Coletivos em 2021 ----------\\\\\\\\\\

///// ------- Alojamentos Familiares Coletivos em 2011 ---------- \\\\

var minAlojFamiColetivos11 = 0;
var maxAlojFamiColetivos11 = 0;;
function estiloAlojaFamColetivos11(feature, latlng) {
    if(feature.properties.ALcoleti11< minAlojFamiColetivos11 || minAlojFamiColetivos11 ===0){
        minAlojFamiColetivos11 = feature.properties.ALcoleti11
    }
    if(feature.properties.ALcoleti11> maxAlojFamiColetivos11){
        maxAlojFamiColetivos11 = feature.properties.ALcoleti11
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALcoleti11,2)
    });
}
function apagarAlojaFamColetivos11(e){
    var layer = e.target;
    AlojaFamColetivos11.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojaFamColetivos11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojaFamColetivos11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojaFamColetivos11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Alojamentos Coletivos: ' + '<b>' +feature.properties.ALcoleti11 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojaFamColetivos11, 
        mouseout:apagarAlojaFamColetivos11,
    })
};
let infoAlojaFamColetivos11 = L.control();

infoAlojaFamColetivos11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojaFamColetivos11.update = function (feature) {
    this._div.innerHTML = '<h4>Alojamentos Coletivos em 2011 </h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.ALclass11 +
    ' Alojamentos Coletivos </sup>': '');
};

var AlojaFamColetivos11= L.geoJSON(tipoAlojamentoConcelho,{
    pointToLayer:estiloAlojaFamColetivos11,
    onEachFeature: onEachFeatureAlojaFamColetivos11,
});


var slideAlojaFamColetivos11 = function(){
    var sliderAlojaFamColetivos11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 2){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojaFamColetivos11, {
        start: [minAlojFamiColetivos11, maxAlojFamiColetivos11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiColetivos11,
            'max': maxAlojFamiColetivos11
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojFamiColetivos11);
    inputNumberMax.setAttribute("value",maxAlojFamiColetivos11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojaFamColetivos11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojaFamColetivos11.noUiSlider.set([null, this.value]);
    });

    sliderAlojaFamColetivos11.noUiSlider.on('update',function(e){
        AlojaFamColetivos11.eachLayer(function(layer){
            if(layer.feature.properties.ALcoleti11>=parseFloat(e[0])&& layer.feature.properties.ALcoleti11 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    sliderAlojaFamColetivos11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 2;
    sliderAtivo = sliderAlojaFamColetivos11.noUiSlider;
    $(slidersGeral).append(sliderAlojaFamColetivos11);
}
////-------- Fim dos Alojamentos Coletivos em 2011 ----------\\\\\\\\\\

//////// --------------------------- Freguesias -------------------------- \\\\\\\\\\\\\\\\\\\

//// -------  FREGUESIAS -  TOTAL DE ALOJAMENTOS 2021 ---------- \\\\\

var minTotalAloja21Freg = 0;
var maxTotalAloja21Freg = 0;
function estilototalAlojaFreguesia21(feature, latlng) {
    if(feature.properties.Total2021< minTotalAloja21Freg || minTotalAloja21Freg ===0){
        minTotalAloja21Freg = feature.properties.Total2021
    }
    if(feature.properties.Total2021> maxTotalAloja21Freg){
        maxTotalAloja21Freg = feature.properties.Total2021
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.Total2021,0.1)
    });
}
function apagartotalAlojaFreguesia21(e){
    var layer = e.target;
    totalAlojaFreguesia21.resetStyle(layer)
    layer.closePopup();
}
function highlighttotalAlojaFreguesia21(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infototalAlojaFreguesia21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeaturetotalAlojaFreguesia21(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos: ' + '<b>' +feature.properties.Total2021 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlighttotalAlojaFreguesia21, 
        mouseout:apagartotalAlojaFreguesia21,
    })
};
let infototalAlojaFreguesia21 = L.control();

infototalAlojaFreguesia21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infototalAlojaFreguesia21.update = function (feature) {
    this._div.innerHTML = '<h4>Total de Alojamentos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.Total2021 +
    ' Alojamentos </sup>': '');
};

var totalAlojaFreguesia21 = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estilototalAlojaFreguesia21,
    onEachFeature: onEachFeaturetotalAlojaFreguesia21,
});


var slidetotalAlojaFreguesia21 = function(){
    var slidertotalAlojaFreguesia21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 3){
        sliderAtivo.destroy();
    }

    noUiSlider.create(slidertotalAlojaFreguesia21, {
        start: [minTotalAloja21Freg, maxTotalAloja21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minTotalAloja21Freg,
            'max': maxTotalAloja21Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minTotalAloja21Freg);
    inputNumberMax.setAttribute("value",maxTotalAloja21Freg);

    inputNumberMin.addEventListener('change', function(){
        slidertotalAlojaFreguesia21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        slidertotalAlojaFreguesia21.noUiSlider.set([null, this.value]);
    });

    slidertotalAlojaFreguesia21.noUiSlider.on('update',function(e){
        totalAlojaFreguesia21.eachLayer(function(layer){
            if(layer.feature.properties.Total2021>=parseFloat(e[0])&& layer.feature.properties.Total2021 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        slidertotalAlojaFreguesia21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 3;
    sliderAtivo = slidertotalAlojaFreguesia21.noUiSlider;
    $(slidersGeral).append(slidertotalAlojaFreguesia21);
}
///////// ------------ FIM TOTAL DE ALOJAMENTOS EM 2021 POR FREGUESIA

//// -------  TOTAL DE ALOJAMENTOS FAMILIARES 2021 ---------- \\\\\

var minTotalAloja11Freg = 0;
var maxTotalAloja11Freg = 0;
function estilototalAlojaFreguesia11(feature, latlng) {
    if(feature.properties.Total2011< minTotalAloja11Freg || minTotalAloja11Freg ===0){
        minTotalAloja11Freg = feature.properties.Total2011
    }
    if(feature.properties.Total2011> maxTotalAloja11Freg){
        maxTotalAloja11Freg = feature.properties.Total2011
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.Total2011,0.1)
    });
}
function apagartotalAlojaFreguesia11(e){
    var layer = e.target;
    totalAlojaFreguesia11.resetStyle(layer)
    layer.closePopup();
}
function highlighttotalAlojaFreguesia11(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infototalAlojaFreguesia11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeaturetotalAlojaFreguesia11(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos: ' + '<b>' +feature.properties.Total2011 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlighttotalAlojaFreguesia11, 
        mouseout:apagartotalAlojaFreguesia11,
    })
};
let infototalAlojaFreguesia11 = L.control();

infototalAlojaFreguesia11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infototalAlojaFreguesia11.update = function (feature) {
    this._div.innerHTML = '<h4>Total de Alojamentos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.Total2011 +
    ' Alojamentos </sup>': '');
};

var totalAlojaFreguesia11 = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estilototalAlojaFreguesia11,
    onEachFeature: onEachFeaturetotalAlojaFreguesia11,
});


var slidetotalAlojaFreguesia11 = function(){
    var slidertotalAlojaFreguesia11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 10){
        sliderAtivo.destroy();
    }

    noUiSlider.create(slidertotalAlojaFreguesia11, {
        start: [minTotalAloja11Freg, maxTotalAloja11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minTotalAloja11Freg,
            'max': maxTotalAloja11Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minTotalAloja11Freg);
    inputNumberMax.setAttribute("value",maxTotalAloja11Freg);

    inputNumberMin.addEventListener('change', function(){
        slidertotalAlojaFreguesia11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        slidertotalAlojaFreguesia11.noUiSlider.set([null, this.value]);
    });

    slidertotalAlojaFreguesia11.noUiSlider.on('update',function(e){
        totalAlojaFreguesia11.eachLayer(function(layer){
            if(layer.feature.properties.Total2011>=parseFloat(e[0])&& layer.feature.properties.Total2011 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        slidertotalAlojaFreguesia11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 10;
    sliderAtivo = slidertotalAlojaFreguesia11.noUiSlider;
    $(slidersGeral).append(slidertotalAlojaFreguesia11);
}
///////// ------------ FIM TOTAL DE ALOJAMENTOS EM 2011 POR FREGUESIA

//// -------  TOTAL DE ALOJAMENTOS FAMILIARES EM 2021 ---------- \\\\\

var minAlojaFami21Freg = 0;
var maxAlojaFami21Freg = 0;
function estiloAlojaFami21Freg(feature, latlng) {
    if(feature.properties.AlojFami21< minAlojaFami21Freg || minAlojaFami21Freg ===0){
        minAlojaFami21Freg = feature.properties.AlojFami21
    }
    if(feature.properties.AlojFami21> maxAlojaFami21Freg){
        maxAlojaFami21Freg = feature.properties.AlojFami21
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.AlojFami21,0.1)
    });
}
function apagarAlojaFami21Freg(e){
    var layer = e.target;
    AlojaFami21Freg.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojaFami21Freg(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoAlojaFami21Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojaFami21Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos: ' + '<b>' +feature.properties.AlojFami21 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojaFami21Freg, 
        mouseout:apagarAlojaFami21Freg,
    })
};
let infoAlojaFami21Freg = L.control();

infoAlojaFami21Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojaFami21Freg.update = function (feature) {
    this._div.innerHTML = '<h4> Alojamentos Familiares em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AlojFami21 +
    ' Alojamentos Familiares </sup>': '');
};

var AlojaFami21Freg = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estiloAlojaFami21Freg,
    onEachFeature: onEachFeatureAlojaFami21Freg,
});


var slideAlojaFami21Freg = function(){
    var sliderAlojaFami21Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 11){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojaFami21Freg, {
        start: [minAlojaFami21Freg, maxAlojaFami21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojaFami21Freg,
            'max': maxAlojaFami21Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojaFami21Freg);
    inputNumberMax.setAttribute("value",maxAlojaFami21Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojaFami21Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojaFami21Freg.noUiSlider.set([null, this.value]);
    });

    sliderAlojaFami21Freg.noUiSlider.on('update',function(e){
        AlojaFami21Freg.eachLayer(function(layer){
            if(layer.feature.properties.AlojFami21>=parseFloat(e[0])&& layer.feature.properties.AlojFami21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojaFami21Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 11;
    sliderAtivo = sliderAlojaFami21Freg.noUiSlider;
    $(slidersGeral).append(sliderAlojaFami21Freg);
}
///////// ------------ FIM TOTAL DE ALOJAMENTOS FAMILIARES EM 2021 POR FREGUESIA

//// -------  TOTAL DE ALOJAMENTOS FAMILIARES EM 2011 ---------- \\\\\

var minAlojaFami11Freg = 0;
var maxAlojaFami11Freg = 0;
function estiloAlojaFami11Freg(feature, latlng) {
    if(feature.properties.AlojFami11< minAlojaFami11Freg || minAlojaFami11Freg ===0){
        minAlojaFami11Freg = feature.properties.AlojFami11
    }
    if(feature.properties.AlojFami11> maxAlojaFami11Freg){
        maxAlojaFami11Freg = feature.properties.AlojFami11
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.AlojFami11,0.1)
    });
}
function apagarAlojaFami11Freg(e){
    var layer = e.target;
    AlojaFami11Freg.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojaFami11Freg(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoAlojaFami11Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojaFami11Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos: ' + '<b>' +feature.properties.AlojFami11 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojaFami11Freg, 
        mouseout:apagarAlojaFami11Freg,
    })
};
let infoAlojaFami11Freg = L.control();

infoAlojaFami11Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojaFami11Freg.update = function (feature) {
    this._div.innerHTML = '<h4> Alojamentos Familiares em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AlojFami11 +
    ' Alojamentos Familiares </sup>': '');
};

var AlojaFami11Freg = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estiloAlojaFami11Freg,
    onEachFeature: onEachFeatureAlojaFami11Freg,
});


var slideAlojaFami11Freg = function(){
    var sliderAlojaFami11Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 12){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojaFami11Freg, {
        start: [minAlojaFami11Freg, maxAlojaFami11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojaFami11Freg,
            'max': maxAlojaFami11Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojaFami11Freg);
    inputNumberMax.setAttribute("value",maxAlojaFami11Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojaFami11Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojaFami11Freg.noUiSlider.set([null, this.value]);
    });

    sliderAlojaFami11Freg.noUiSlider.on('update',function(e){
        AlojaFami11Freg.eachLayer(function(layer){
            if(layer.feature.properties.AlojFami11>=parseFloat(e[0])&& layer.feature.properties.AlojFami11 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojaFami11Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 12;
    sliderAtivo = sliderAlojaFami11Freg.noUiSlider;
    $(slidersGeral).append(sliderAlojaFami11Freg);
}
///////// ------------ FIM TOTAL DE ALOJAMENTOS FAMILIARES EM 2011 POR FREGUESIA

//// -------  ALOJAMENTOS FAMILIARES CLÁSSICOS EM 2021 Freguesia ---------- \\\\\

var minAlojaFamiClass21Freg = 0;
var maxAlojaFamiClass21Freg = 0;
function estiloAlojaFamiClass21Freg(feature, latlng) {
    if(feature.properties.ALclass21< minAlojaFamiClass21Freg || minAlojaFamiClass21Freg ===0){
        minAlojaFamiClass21Freg = feature.properties.ALclass21
    }
    if(feature.properties.ALclass21> maxAlojaFamiClass21Freg){
        maxAlojaFamiClass21Freg = feature.properties.ALclass21
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALclass21,0.1)
    });
}
function apagarAlojaFamiClass21Freg(e){
    var layer = e.target;
    AlojaFamiClass21Freg.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojaFamiClass21Freg(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoAlojaFamiClass21Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojaFamiClass21Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos Familiares Clássicos: ' + '<b>' +feature.properties.ALclass21 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojaFamiClass21Freg, 
        mouseout:apagarAlojaFamiClass21Freg,
    })
};
let infoAlojaFamiClass21Freg = L.control();

infoAlojaFamiClass21Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojaFamiClass21Freg.update = function (feature) {
    this._div.innerHTML = '<h4> Alojamentos Familiares Clássicos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.ALclass21 +
    ' Alojamentos Familiares Clássicos </sup>': '');
};

var AlojaFamiClass21Freg = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estiloAlojaFamiClass21Freg,
    onEachFeature: onEachFeatureAlojaFamiClass21Freg,
});


var slideAlojaFamiClass21Freg = function(){
    var sliderAlojaFamiClass21Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 13){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojaFamiClass21Freg, {
        start: [minAlojaFamiClass21Freg, maxAlojaFamiClass21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojaFamiClass21Freg,
            'max': maxAlojaFamiClass21Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojaFamiClass21Freg);
    inputNumberMax.setAttribute("value",maxAlojaFamiClass21Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojaFamiClass21Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojaFamiClass21Freg.noUiSlider.set([null, this.value]);
    });

    sliderAlojaFamiClass21Freg.noUiSlider.on('update',function(e){
        AlojaFamiClass21Freg.eachLayer(function(layer){
            if(layer.feature.properties.ALclass21>=parseFloat(e[0])&& layer.feature.properties.ALclass21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojaFamiClass21Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 13;
    sliderAtivo = sliderAlojaFamiClass21Freg.noUiSlider;
    $(slidersGeral).append(sliderAlojaFamiClass21Freg);
}
///////// ------------ FIM TOTAL DE ALOJAMENTOS FAMILIARES CLÁSSICOS EM 2021 POR FREGUESIA


//// -------  ALOJAMENTOS FAMILIARES CLÁSSICOS EM 2011 Freguesia ---------- \\\\\

var minAlojaFamiClass11Freg = 0;
var maxAlojaFamiClass11Freg = 0;
function estiloAlojaFamiClass11Freg(feature, latlng) {
    if(feature.properties.ALclass11< minAlojaFamiClass11Freg || minAlojaFamiClass11Freg ===0){
        minAlojaFamiClass11Freg = feature.properties.ALclass11
    }
    if(feature.properties.ALclass11> maxAlojaFamiClass11Freg){
        maxAlojaFamiClass11Freg = feature.properties.ALclass11
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALclass11,0.1)
    });
}
function apagarAlojaFamiClass11Freg(e){
    var layer = e.target;
    AlojaFamiClass11Freg.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojaFamiClass11Freg(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoAlojaFamiClass11Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojaFamiClass11Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos Familiares Clássicos: ' + '<b>' +feature.properties.ALclass11 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojaFamiClass11Freg, 
        mouseout:apagarAlojaFamiClass11Freg,
    })
};
let infoAlojaFamiClass11Freg = L.control();

infoAlojaFamiClass11Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojaFamiClass11Freg.update = function (feature) {
    this._div.innerHTML = '<h4> Alojamentos Familiares Clássicos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.ALclass11 +
    ' Alojamentos Familiares Clássicos </sup>': '');
};

var AlojaFamiClass11Freg = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estiloAlojaFamiClass11Freg,
    onEachFeature: onEachFeatureAlojaFamiClass11Freg,
});


var slideAlojaFamiClass11Freg = function(){
    var sliderAlojaFamiClass11Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 14){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojaFamiClass11Freg, {
        start: [minAlojaFamiClass11Freg, maxAlojaFamiClass11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojaFamiClass11Freg,
            'max': maxAlojaFamiClass11Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojaFamiClass11Freg);
    inputNumberMax.setAttribute("value",maxAlojaFamiClass11Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojaFamiClass11Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojaFamiClass11Freg.noUiSlider.set([null, this.value]);
    });

    sliderAlojaFamiClass11Freg.noUiSlider.on('update',function(e){
        AlojaFamiClass11Freg.eachLayer(function(layer){
            if(layer.feature.properties.ALclass11>=parseFloat(e[0])&& layer.feature.properties.ALclass11 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojaFamiClass11Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 14;
    sliderAtivo = sliderAlojaFamiClass11Freg.noUiSlider;
    $(slidersGeral).append(sliderAlojaFamiClass11Freg);
}
///////// ------------ FIM TOTAL DE ALOJAMENTOS FAMILIARES CLÁSSICOS EM 2011 POR FREGUESIA


//// -------  ALOJAMENTOS FAMILIARES NÃO CLÁSSICOS EM 2021 Freguesia ---------- \\\\\

var minAlojaFamiNaoClass21Freg = 0;
var maxAlojaFamiNaoClass21Freg = 0;
function estiloAlojaFamiNaoClass21Freg(feature, latlng) {
    if(feature.properties.ALnclass21< minAlojaFamiNaoClass21Freg || minAlojaFamiNaoClass21Freg ===0){
        minAlojaFamiNaoClass21Freg = feature.properties.ALnclass21
    }
    if(feature.properties.ALnclass21> maxAlojaFamiNaoClass21Freg){
        maxAlojaFamiNaoClass21Freg = feature.properties.ALnclass21
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALnclass21,2)
    });
}
function apagarAlojaFamiNaoClass21Freg(e){
    var layer = e.target;
    AlojaFamiNaoClass21Freg.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojaFamiNaoClass21Freg(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoAlojaFamiNaoClass21Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojaFamiNaoClass21Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos Familiares Não Clássicos: ' + '<b>' +feature.properties.ALnclass21 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojaFamiNaoClass21Freg, 
        mouseout:apagarAlojaFamiNaoClass21Freg,
    })
};
let infoAlojaFamiNaoClass21Freg = L.control();

infoAlojaFamiNaoClass21Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojaFamiNaoClass21Freg.update = function (feature) {
    this._div.innerHTML = '<h4> Alojamentos Familiares Não Clássicos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.ALnclass21 +
    ' Alojamentos Familiares Não Clássicos </sup>': '');
};

var AlojaFamiNaoClass21Freg = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estiloAlojaFamiNaoClass21Freg,
    onEachFeature: onEachFeatureAlojaFamiNaoClass21Freg,
});


var slideAlojaFamiNaoClass21Freg = function(){
    var sliderAlojaFamiNaoClass21Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 15){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojaFamiNaoClass21Freg, {
        start: [minAlojaFamiNaoClass21Freg, maxAlojaFamiNaoClass21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojaFamiNaoClass21Freg,
            'max': maxAlojaFamiNaoClass21Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojaFamiNaoClass21Freg);
    inputNumberMax.setAttribute("value",maxAlojaFamiNaoClass21Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojaFamiNaoClass21Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojaFamiNaoClass21Freg.noUiSlider.set([null, this.value]);
    });

    sliderAlojaFamiNaoClass21Freg.noUiSlider.on('update',function(e){
        AlojaFamiNaoClass21Freg.eachLayer(function(layer){
            if(layer.feature.properties.ALnclass21>=parseFloat(e[0])&& layer.feature.properties.ALnclass21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojaFamiNaoClass21Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 15;
    sliderAtivo = sliderAlojaFamiNaoClass21Freg.noUiSlider;
    $(slidersGeral).append(sliderAlojaFamiNaoClass21Freg);
}
///////// ------------ FIM DE ALOJAMENTOS FAMILIARES NÃO CLÁSSICOS EM 2021 POR FREGUESIA

//// -------  ALOJAMENTOS FAMILIARES NÃO CLÁSSICOS EM 2011 Freguesia ---------- \\\\\

var minAlojaFamiNaoClass11Freg = 0;
var maxAlojaFamiNaoClass11Freg = 0;
function estiloAlojaFamiNaoClass11Freg(feature, latlng) {
    if(feature.properties.ALnclass11< minAlojaFamiNaoClass11Freg || minAlojaFamiNaoClass11Freg ===0){
        minAlojaFamiNaoClass11Freg = feature.properties.ALnclass11
    }
    if(feature.properties.ALnclass11> maxAlojaFamiNaoClass11Freg){
        maxAlojaFamiNaoClass11Freg = feature.properties.ALnclass11
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALnclass11,2)
    });
}
function apagarAlojaFamiNaoClass11Freg(e){
    var layer = e.target;
    AlojaFamiNaoClass11Freg.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojaFamiNaoClass11Freg(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoAlojaFamiNaoClass11Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojaFamiNaoClass11Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos Familiares Não Clássicos: ' + '<b>' +feature.properties.ALnclass11 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojaFamiNaoClass11Freg, 
        mouseout:apagarAlojaFamiNaoClass11Freg,
    })
};
let infoAlojaFamiNaoClass11Freg = L.control();

infoAlojaFamiNaoClass11Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojaFamiNaoClass11Freg.update = function (feature) {
    this._div.innerHTML = '<h4> Alojamentos Familiares Não Clássicos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.ALnclass11 +
    ' Alojamentos Familiares Não Clássicos </sup>': '');
};

var AlojaFamiNaoClass11Freg = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estiloAlojaFamiNaoClass11Freg,
    onEachFeature: onEachFeatureAlojaFamiNaoClass11Freg,
});


var slideAlojaFamiNaoClass11Freg = function(){
    var sliderAlojaFamiNaoClass11Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 16){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojaFamiNaoClass11Freg, {
        start: [minAlojaFamiNaoClass11Freg, maxAlojaFamiNaoClass11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojaFamiNaoClass11Freg,
            'max': maxAlojaFamiNaoClass11Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojaFamiNaoClass11Freg);
    inputNumberMax.setAttribute("value",maxAlojaFamiNaoClass11Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojaFamiNaoClass11Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojaFamiNaoClass11Freg.noUiSlider.set([null, this.value]);
    });

    sliderAlojaFamiNaoClass11Freg.noUiSlider.on('update',function(e){
        AlojaFamiNaoClass11Freg.eachLayer(function(layer){
            if(layer.feature.properties.ALnclass11>=parseFloat(e[0])&& layer.feature.properties.ALnclass11 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojaFamiNaoClass11Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 16;
    sliderAtivo = sliderAlojaFamiNaoClass11Freg.noUiSlider;
    $(slidersGeral).append(sliderAlojaFamiNaoClass11Freg);
}
///////// ------------ FIM DE ALOJAMENTOS FAMILIARES NÃO CLÁSSICOS EM 2011 POR FREGUESIA

//// -------  ALOJAMENTOS FAMILIARES COLETIVOS EM 2021 Freguesia ---------- \\\\\

var minAlojColetivo21Freg = 0;
var maxAlojColetivo21Freg = 0;
function estiloAlojColetivo21Freg(feature, latlng) {
    if(feature.properties.ALcole21< minAlojColetivo21Freg || minAlojColetivo21Freg ===0){
        minAlojColetivo21Freg = feature.properties.ALcole21
    }
    if(feature.properties.ALcole21> maxAlojColetivo21Freg){
        maxAlojColetivo21Freg = feature.properties.ALcole21
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALcole21,2)
    });
}
function apagarAlojColetivo21Freg(e){
    var layer = e.target;
    AlojColetivo21Freg.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojColetivo21Freg(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoAlojColetivo21Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojColetivo21Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos Coletivos: ' + '<b>' +feature.properties.ALcole21 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojColetivo21Freg, 
        mouseout:apagarAlojColetivo21Freg,
    })
};
let infoAlojColetivo21Freg = L.control();

infoAlojColetivo21Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojColetivo21Freg.update = function (feature) {
    this._div.innerHTML = '<h4> Alojamentos Coletivos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.ALcole21 +
    ' Alojamentos Coletivos </sup>': '');
};

var AlojColetivo21Freg = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estiloAlojColetivo21Freg,
    onEachFeature: onEachFeatureAlojColetivo21Freg,
});


var slideAlojColetivo21Freg = function(){
    var sliderAlojColetivo21Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 19){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojColetivo21Freg, {
        start: [minAlojColetivo21Freg, maxAlojColetivo21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojColetivo21Freg,
            'max': maxAlojColetivo21Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojColetivo21Freg);
    inputNumberMax.setAttribute("value",maxAlojColetivo21Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojColetivo21Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojColetivo21Freg.noUiSlider.set([null, this.value]);
    });

    sliderAlojColetivo21Freg.noUiSlider.on('update',function(e){
        AlojColetivo21Freg.eachLayer(function(layer){
            if(layer.feature.properties.ALcole21>=parseFloat(e[0])&& layer.feature.properties.ALcole21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojColetivo21Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 19;
    sliderAtivo = sliderAlojColetivo21Freg.noUiSlider;
    $(slidersGeral).append(sliderAlojColetivo21Freg);
}
///////// ------------ FIM DE ALOJAMENTOS COLETIVOS EM 2021 POR FREGUESIA

//// -------  ALOJAMENTOS FAMILIARES COLETIVOS EM 2011 Freguesia ---------- \\\\\

var minAlojColetivo11Freg = 0;
var maxAlojColetivo11Freg = 0;
function estiloAlojColetivo11Freg(feature, latlng) {
    if(feature.properties.ALcoleti11< minAlojColetivo11Freg || minAlojColetivo11Freg ===0){
        minAlojColetivo11Freg = feature.properties.ALcoleti11
    }
    if(feature.properties.ALcoleti11> maxAlojColetivo11Freg){
        maxAlojColetivo11Freg = feature.properties.ALcoleti11
    }
    return L.circleMarker(latlng, {
        color: 'black',
        weight: 1,
        fillColor: 'red',
        fillOpacity: 0.7,
        radius: getRadius(feature.properties.ALcoleti11,2)
    });
}
function apagarAlojColetivo11Freg(e){
    var layer = e.target;
    AlojColetivo11Freg.resetStyle(layer)
    layer.closePopup();
}
function highlightAlojColetivo11Freg(e, dipro) {
    var layer = e.target;
    layer.openPopup();
    infoAlojColetivo11Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}

function onEachFeatureAlojColetivo11Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Alojamentos Coletivos: ' + '<b>' +feature.properties.ALcoleti11 + '</b>').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightAlojColetivo11Freg, 
        mouseout:apagarAlojColetivo11Freg,
    })
};
let infoAlojColetivo11Freg = L.control();

infoAlojColetivo11Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojColetivo11Freg.update = function (feature) {
    this._div.innerHTML = '<h4> Alojamentos Coletivos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.ALcoleti11 +
    ' Alojamentos Coletivos </sup>': '');
};

var AlojColetivo11Freg = L.geoJSON(tipoAlojamentoFreguesia,{
    pointToLayer:estiloAlojColetivo11Freg,
    onEachFeature: onEachFeatureAlojColetivo11Freg,
});


var slideAlojColetivo11Freg = function(){
    var sliderAlojColetivo11Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 20){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojColetivo11Freg, {
        start: [minAlojColetivo11Freg, maxAlojColetivo11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojColetivo11Freg,
            'max': maxAlojColetivo11Freg
        },
        format:{
            to: (v) => v | 0,
            from: (v) => v | 0
    }});
    
    inputNumberMin.setAttribute("value",minAlojColetivo11Freg);
    inputNumberMax.setAttribute("value",maxAlojColetivo11Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojColetivo11Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojColetivo11Freg.noUiSlider.set([null, this.value]);
    });

    sliderAlojColetivo11Freg.noUiSlider.on('update',function(e){
        AlojColetivo11Freg.eachLayer(function(layer){
            if(layer.feature.properties.ALcoleti11>=parseFloat(e[0])&& layer.feature.properties.ALcoleti11 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojColetivo11Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })

    ifSlide2isActive = 20;
    sliderAtivo = sliderAlojColetivo11Freg.noUiSlider;
    $(slidersGeral).append(sliderAlojColetivo11Freg);
}
///////// ------------ FIM DE ALOJAMENTOS COLETIVOS EM 2011 POR FREGUESIA ------- \\\\\\\\\\\\\

//// ------------------ VARIACAO CONCELHOS --------------------------\
//VarTipoAlojamentoFreg 

//////------- Variação TOTAL DE ALOJAMENTOS Concelhos entre 2021 e 2011 -----////


function CorAlojVarConcelho21_11(d) {
    return d > 4  ? 'rgb(255,82,82)' :
    d > 2 ? 'rgb(255,186,186)' :
    d > 0  ? 'rgb(255,247,192)' :
    d > -1   ? 'rgb(62,123,169)' :
    d > -3.09   ? 'rgb(14,89,147)' :
              '';
}
var minAlojVarConcelho21_11 = 0;
var maxAlojVarConcelho21_11 = 1;

function EstiloAlojVarConcelho21_11(feature) {
    if(feature.properties.VarTotal21 <= minAlojVarConcelho21_11 || minAlojVarConcelho21_11 ===0){
        minAlojVarConcelho21_11 = feature.properties.VarTotal21
    }
    if(feature.properties.VarTotal21 > maxAlojVarConcelho21_11){
        maxAlojVarConcelho21_11 = feature.properties.VarTotal21 + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojVarConcelho21_11(feature.properties.VarTotal21)};
    }


function apagarAlojVarConcelho21_11(e) {
    AlojVarConcelho21_11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojVarConcelho21_11 = L.control();

infoAlojVarConcelho21_11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojVarConcelho21_11.update = function (feature) {
    this._div.innerHTML = '<h4>Variação do Total de Alojamentos entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VarTotal21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojVarConcelho21_11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojVarConcelho21_11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojVarConcelho21_11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarTotal21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojVarConcelho21_11,
        mouseout: apagarAlojVarConcelho21_11,
    });
}
var AlojVarConcelho21_11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojVarConcelho21_11,
    onEachFeature: onEachFeatureAlojVarConcelho21_11
});
var LegendaAlojVarConcelho21_11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação do Total de Alojamentos entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 4 - 5.4' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '2 - 4' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -1' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -1 - -3.09' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojVarConcelho21_11 = function(){
    var sliderAlojVarConcelho21_11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 21){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojVarConcelho21_11, {
        start: [minAlojVarConcelho21_11, maxAlojVarConcelho21_11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojVarConcelho21_11,
            'max': maxAlojVarConcelho21_11
        },
        });
    inputNumberMin.setAttribute("value",minAlojVarConcelho21_11);
    inputNumberMax.setAttribute("value",maxAlojVarConcelho21_11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojVarConcelho21_11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojVarConcelho21_11.noUiSlider.set([null, this.value]);
    });

    sliderAlojVarConcelho21_11.noUiSlider.on('update',function(e){
        AlojVarConcelho21_11.eachLayer(function(layer){
            if(layer.feature.properties.VarTotal21>=parseFloat(e[0])&& layer.feature.properties.VarTotal21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojVarConcelho21_11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 21;
    sliderAtivo = sliderAlojVarConcelho21_11.noUiSlider;
    $(slidersGeral).append(sliderAlojVarConcelho21_11);
} 

///// Fim da Variação do TOTAL DE ALOJAMENTOS dos Concelhos em 2021 -------------- \\\\\\


//////------- Variação DE ALOJAMENTOS FAmiliares Concelhos entre 2021 e 2011 -----////


function CorAlojFamiVarConcelho21_11(d) {
    return d > 4  ? 'rgb(255,82,82)' :
    d > 2 ? 'rgb(255,186,186)' :
    d > 0  ? 'rgb(255,247,192)' :
    d > -2.93   ? 'rgb(62,123,169)' :
              '';
}
var minAlojFamiVarConcelho21_11 = 0;
var maxAlojFamiVarConcelho21_11 = 1;

function EstiloAlojFamiVarConcelho21_11(feature) {
    if(feature.properties.VarAlojFam <= minAlojFamiVarConcelho21_11 || minAlojFamiVarConcelho21_11 ===0){
        minAlojFamiVarConcelho21_11 = feature.properties.VarAlojFam
    }
    if(feature.properties.VarAlojFam > maxAlojFamiVarConcelho21_11){
        maxAlojFamiVarConcelho21_11 = feature.properties.VarAlojFam + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamiVarConcelho21_11(feature.properties.VarAlojFam)};
    }


function apagarAlojFamiVarConcelho21_11(e) {
    AlojFamiVarConcelho21_11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamiVarConcelho21_11 = L.control();

infoAlojFamiVarConcelho21_11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojFamiVarConcelho21_11.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Familiares entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VarAlojFam.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamiVarConcelho21_11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamiVarConcelho21_11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamiVarConcelho21_11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarAlojFam.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamiVarConcelho21_11,
        mouseout: apagarAlojFamiVarConcelho21_11,
    });
}
var AlojFamiVarConcelho21_11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamiVarConcelho21_11,
    onEachFeature: onEachFeatureAlojFamiVarConcelho21_11
});
var LegendaAlojFamiVarConcelho21_11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Familiares entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 4 - 5.4' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '2 - 4' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - 2.92' + '<br>'
    // symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -1 - -3.09' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamiVarConcelho21_11 = function(){
    var sliderAlojFamiVarConcelho21_11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 22){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamiVarConcelho21_11, {
        start: [minAlojFamiVarConcelho21_11, maxAlojFamiVarConcelho21_11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiVarConcelho21_11,
            'max': maxAlojFamiVarConcelho21_11
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamiVarConcelho21_11);
    inputNumberMax.setAttribute("value",maxAlojFamiVarConcelho21_11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamiVarConcelho21_11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamiVarConcelho21_11.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamiVarConcelho21_11.noUiSlider.on('update',function(e){
        AlojFamiVarConcelho21_11.eachLayer(function(layer){
            if(layer.feature.properties.VarAlojFam>=parseFloat(e[0])&& layer.feature.properties.VarAlojFam <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamiVarConcelho21_11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 22;
    sliderAtivo = sliderAlojFamiVarConcelho21_11.noUiSlider;
    $(slidersGeral).append(sliderAlojFamiVarConcelho21_11);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES dos Concelhos em 2021 -------------- \\\\\\



//////------- Variação DE ALOJAMENTOS FAmiliares CLÁSSICOS Concelhos entre 2021 e 2011 -----////


function CorAlojFamiClassVarConcelho21_11(d) {
    return d > 4  ? 'rgb(255,82,82)' :
    d > 2 ? 'rgb(255,186,186)' :
    d > 0  ? 'rgb(255,247,192)' :
    d > -2.93   ? 'rgb(62,123,169)' :
              '';
}
var minAlojFamiClassVarConcelho21_11 = 0;
var maxAlojFamiClassVarConcelho21_11 = 1;

function EstiloAlojFamiClassVarConcelho21_11(feature) {
    if(feature.properties.VarALClass <= minAlojFamiClassVarConcelho21_11 || minAlojFamiClassVarConcelho21_11 ===0){
        minAlojFamiClassVarConcelho21_11 = feature.properties.VarALClass - 0.01
    }
    if(feature.properties.VarALClass > maxAlojFamiClassVarConcelho21_11){
        maxAlojFamiClassVarConcelho21_11 = feature.properties.VarALClass + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamiClassVarConcelho21_11(feature.properties.VarALClass)};
    }


function apagarAlojFamiClassVarConcelho21_11(e) {
    AlojFamiClassVarConcelho21_11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamiClassVarConcelho21_11 = L.control();

infoAlojFamiClassVarConcelho21_11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojFamiClassVarConcelho21_11.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Familiares Clássicos entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VarALClass.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamiClassVarConcelho21_11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamiClassVarConcelho21_11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamiClassVarConcelho21_11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarALClass.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamiClassVarConcelho21_11,
        mouseout: apagarAlojFamiClassVarConcelho21_11,
    });
}
var AlojFamiClassVarConcelho21_11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamiClassVarConcelho21_11,
    onEachFeature: onEachFeatureAlojFamiClassVarConcelho21_11
});
var LegendaAlojFamiClassVarConcelho21_11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Familiares Clássicos entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 4 - 5.4' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '2 - 4' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - 2.92' + '<br>'
    // symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -1 - -3.09' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamiClassVarConcelho21_11 = function(){
    var sliderAlojFamiClassVarConcelho21_11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 23){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamiClassVarConcelho21_11, {
        start: [minAlojFamiClassVarConcelho21_11, maxAlojFamiClassVarConcelho21_11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiClassVarConcelho21_11,
            'max': maxAlojFamiClassVarConcelho21_11
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamiClassVarConcelho21_11);
    inputNumberMax.setAttribute("value",maxAlojFamiClassVarConcelho21_11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamiClassVarConcelho21_11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamiClassVarConcelho21_11.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamiClassVarConcelho21_11.noUiSlider.on('update',function(e){
        AlojFamiClassVarConcelho21_11.eachLayer(function(layer){
            if(layer.feature.properties.VarALClass>=parseFloat(e[0])&& layer.feature.properties.VarALClass <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamiClassVarConcelho21_11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 23;
    sliderAtivo = sliderAlojFamiClassVarConcelho21_11.noUiSlider;
    $(slidersGeral).append(AlojFamiClassVarConcelho21_11);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES dos Concelhos em 2021 -------------- \\\\\\

//////------- Variação dos ALOJAMENTOS FAMILIARES  NÃO CLÁSSICOS dos Concelhos entre 2021 e 2011-----////


function CorAlojFamiNaoClassVarConcelho21_11(d) {
    return d > 100  ? 'rgb(255,82,82)' :
    d > 50 ? 'rgb(255,186,186)' :
    d > 0  ? 'rgb(255,247,192)' :
    d > -50.1   ? 'rgb(62,123,169)' :
    d > -100.02   ? 'rgb(14,89,147)' :
              '';
}
var minAlojFamiNaoClassVarConcelho21_11 = 0;
var maxAlojFamiNaoClassVarConcelho21_11 = 1;

function EstiloAlojFamiNaoClassVarConcelho21_11(feature) {
    if(feature.properties.VarNClass <= minAlojFamiNaoClassVarConcelho21_11 || minAlojFamiNaoClassVarConcelho21_11 ===0){
        minAlojFamiNaoClassVarConcelho21_11 = feature.properties.VarNClass - 0.01
    }
    if(feature.properties.VarNClass > maxAlojFamiNaoClassVarConcelho21_11){
        maxAlojFamiNaoClassVarConcelho21_11 = feature.properties.VarNClass + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamiNaoClassVarConcelho21_11(feature.properties.VarNClass)};
    }


function apagarAlojFamiNaoClassVarConcelho21_11(e) {
    AlojFamiNaoClassVarConcelho21_11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamiNaoClassVarConcelho21_11 = L.control();

infoAlojFamiNaoClassVarConcelho21_11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojFamiNaoClassVarConcelho21_11.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Familiares Não Clássicos entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VarNClass.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamiNaoClassVarConcelho21_11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamiNaoClassVarConcelho21_11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamiNaoClassVarConcelho21_11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarNClass.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamiNaoClassVarConcelho21_11,
        mouseout: apagarAlojFamiNaoClassVarConcelho21_11,
    });
}
var AlojFamiNaoClassVarConcelho21_11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamiNaoClassVarConcelho21_11,
    onEachFeature: onEachFeatureAlojFamiNaoClassVarConcelho21_11
});
var LegendaAlojFamiNaoClassVarConcelho21_11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Familiares Não Clássicos entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 100 - 162.51' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '50 - 100' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 50' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -50' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -50 - -100' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamiNaoClassVarConcelho21_11 = function(){
    var sliderAlojFamiNaoClassVarConcelho21_11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 24){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamiNaoClassVarConcelho21_11, {
        start: [minAlojFamiNaoClassVarConcelho21_11, maxAlojFamiNaoClassVarConcelho21_11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiNaoClassVarConcelho21_11,
            'max': maxAlojFamiNaoClassVarConcelho21_11
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamiNaoClassVarConcelho21_11);
    inputNumberMax.setAttribute("value",maxAlojFamiNaoClassVarConcelho21_11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamiNaoClassVarConcelho21_11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamiNaoClassVarConcelho21_11.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamiNaoClassVarConcelho21_11.noUiSlider.on('update',function(e){
        AlojFamiNaoClassVarConcelho21_11.eachLayer(function(layer){
            if(layer.feature.properties.VarNClass>=parseFloat(e[0])&& layer.feature.properties.VarNClass <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamiNaoClassVarConcelho21_11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 24;
    sliderAtivo = sliderAlojFamiNaoClassVarConcelho21_11.noUiSlider;
    $(slidersGeral).append(sliderAlojFamiNaoClassVarConcelho21_11);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES  NÃO CLÁSSICOS dos Concelhos entre 2021 e 2011 -------------- \\\\\\


//////------- Variação dos ALOJAMENTOS FAMILIARES Coletivos dos Concelhos entre 2021 e 2011-----////


function CorAlojColetivosVarConcelho21_11(d) {
    return d > 10 ? 'rgb(255,186,186)' :
    d > 0  ? 'rgb(255,247,192)' :
    d > -30   ? 'rgb(62,123,169)' :
    d > -61.92   ? 'rgb(14,89,147)' :
              '';
}
var minAlojColetivosVarConcelho21_11 = 0;
var maxAlojColetivosVarConcelho21_11 = 1;

function EstiloAlojColetivosVarConcelho21_11(feature) {
    if(feature.properties.VarAloCole <= minAlojColetivosVarConcelho21_11 || minAlojColetivosVarConcelho21_11 ===0){
        minAlojColetivosVarConcelho21_11 = feature.properties.VarAloCole - 0.01
    }
    if(feature.properties.VarAloCole > maxAlojColetivosVarConcelho21_11){
        maxAlojColetivosVarConcelho21_11 = feature.properties.VarAloCole + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojColetivosVarConcelho21_11(feature.properties.VarAloCole)};
    }


function apagarAlojColetivosVarConcelho21_11(e) {
    AlojColetivosVarConcelho21_11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojColetivosVarConcelho21_11 = L.control();

infoAlojColetivosVarConcelho21_11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojColetivosVarConcelho21_11.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Coletivos entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VarAloCole.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojColetivosVarConcelho21_11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojColetivosVarConcelho21_11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojColetivosVarConcelho21_11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarAloCole.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojColetivosVarConcelho21_11,
        mouseout: apagarAlojColetivosVarConcelho21_11,
    });
}
var AlojColetivosVarConcelho21_11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojColetivosVarConcelho21_11,
    onEachFeature: onEachFeatureAlojColetivosVarConcelho21_11
});
var LegendaAlojColetivosVarConcelho21_11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Coletivos entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '10 - 23.54' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -30' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -30 - -61.92' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojColetivosVarConcelho21_11 = function(){
    var sliderAlojColetivosVarConcelho21_11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 25){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojColetivosVarConcelho21_11, {
        start: [minAlojColetivosVarConcelho21_11, maxAlojColetivosVarConcelho21_11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojColetivosVarConcelho21_11,
            'max': maxAlojColetivosVarConcelho21_11
        },
        });
    inputNumberMin.setAttribute("value",minAlojColetivosVarConcelho21_11);
    inputNumberMax.setAttribute("value",maxAlojColetivosVarConcelho21_11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojColetivosVarConcelho21_11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojColetivosVarConcelho21_11.noUiSlider.set([null, this.value]);
    });

    sliderAlojColetivosVarConcelho21_11.noUiSlider.on('update',function(e){
        AlojColetivosVarConcelho21_11.eachLayer(function(layer){
            if(layer.feature.properties.VarAloCole>=parseFloat(e[0])&& layer.feature.properties.VarAloCole <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojColetivosVarConcelho21_11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 25;
    sliderAtivo = sliderAlojColetivosVarConcelho21_11.noUiSlider;
    $(slidersGeral).append(sliderAlojColetivosVarConcelho21_11);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES Coletivos dos Concelhos entre 2021 e 2011 -------------- \\\\\\



////// ---------------------------- VARIAÇÃO DOS ALOJAMENTOS ENTRE 2011 E 2001 \\\\\\\\\\\\\\\\\\\\\\\\\\\

/////Variação do Total de Alojamentos entre 2011 e 001


function CorAlojVarConcelho11_01(d) {
    return d > 20 ? 'rgb(255,82,82)' :
    d > 16 ? 'rgb(255,186,186)' :
    d > 14  ? 'rgb(255,247,192)' :
    d > 10  ? 'rgb(62,123,169)' :
    d > 8   ? 'rgb(14,89,147)' :
              '';
}
var minAlojVarConcelho11_01 = 0;
var maxAlojVarConcelho11_01 = 0;

function EstiloAlojVarConcelho11_01(feature) {
    if(feature.properties.VT11_01 <= minAlojVarConcelho11_01 || minAlojVarConcelho11_01 ===0){
        minAlojVarConcelho11_01 = feature.properties.VT11_01
    }
    if(feature.properties.VT11_01 > maxAlojVarConcelho11_01){
        maxAlojVarConcelho11_01 = feature.properties.VT11_01 + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojVarConcelho11_01(feature.properties.VT11_01)};
    }


function apagarAlojVarConcelho11_01(e) {
    AlojVarConcelho11_01.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojVarConcelho11_01 = L.control();

infoAlojVarConcelho11_01.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojVarConcelho11_01.update = function (feature) {
    this._div.innerHTML = '<h4>Variação do Total de Alojamentos entre 2011 e 2001</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VT11_01.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojVarConcelho11_01(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojVarConcelho11_01.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojVarConcelho11_01(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VT11_01.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojVarConcelho11_01,
        mouseout: apagarAlojVarConcelho11_01,
    });
}
var AlojVarConcelho11_01= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojVarConcelho11_01,
    onEachFeature: onEachFeatureAlojVarConcelho11_01
});
var LegendaVariacaoConcelhos2021_2011 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação do Total de Alojamentos entre 2011 e 2001'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 22.33' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '16 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 14 - 16' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 10 - 14' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 8 - 10' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojVarConcelho11_01 = function(){
    var sliderAlojVarConcelho11_01 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 47){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojVarConcelho11_01, {
        start: [minAlojVarConcelho11_01, maxAlojVarConcelho11_01],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojVarConcelho11_01,
            'max': maxAlojVarConcelho11_01
        },
        });
    inputNumberMin.setAttribute("value",minAlojVarConcelho11_01);
    inputNumberMax.setAttribute("value",maxAlojVarConcelho11_01);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojVarConcelho11_01.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojVarConcelho11_01.noUiSlider.set([null, this.value]);
    });

    sliderAlojVarConcelho11_01.noUiSlider.on('update',function(e){
        AlojVarConcelho11_01.eachLayer(function(layer){
            if(layer.feature.properties.VT11_01>=parseFloat(e[0])&& layer.feature.properties.VT11_01 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojVarConcelho11_01.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 47;
    sliderAtivo = sliderAlojVarConcelho11_01.noUiSlider;
    $(slidersGeral).append(sliderAlojVarConcelho11_01);
} 

///// Fim da Variação do TOTAL DE ALOJAMENTOS dos Concelhos em 2021 -------------- \\\\\\


//////------- Variação DE ALOJAMENTOS FAmiliares Concelhos entre 2011 e 2001 -----////


function CorAlojFamiVarConcelho11_01(d) {
    return d > 20 ? 'rgb(255,82,82)':
    d > 16  ? 'rgb(255,186,186)' :
    d > 14 ? 'rgb(255,247,192)' :
    d > 10  ? 'rgb(62,123,169)' :
    d > 8   ? 'rgb(14,89,147)' :
              '';
}
var minAlojFamiVarConcelho11_01 = 0;
var maxAlojFamiVarConcelho11_01 = 0;

function EstiloAlojFamiVarConcelho11_01(feature) {
    if(feature.properties.VAF11_01 <= minAlojFamiVarConcelho11_01 || minAlojFamiVarConcelho11_01 ===0){
        minAlojFamiVarConcelho11_01 = feature.properties.VAF11_01
    }
    if(feature.properties.VAF11_01 > maxAlojFamiVarConcelho11_01){
        maxAlojFamiVarConcelho11_01 = feature.properties.VAF11_01 + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamiVarConcelho11_01(feature.properties.VAF11_01)};
    }


function apagarAlojFamiVarConcelho11_01(e) {
    AlojFamiVarConcelho11_01.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamiVarConcelho11_01 = L.control();

infoAlojFamiVarConcelho11_01.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojFamiVarConcelho11_01.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Familiares entre 2011 e 2001</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VAF11_01.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamiVarConcelho11_01(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamiVarConcelho11_01.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamiVarConcelho11_01(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VAF11_01.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamiVarConcelho11_01,
        mouseout: apagarAlojFamiVarConcelho11_01,
    });
}
var AlojFamiVarConcelho11_01= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamiVarConcelho11_01,
    onEachFeature: onEachFeatureAlojFamiVarConcelho11_01
});
var LegendaAlojFamiVarConcelhos = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Familiares entre 2011 e 2001'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 22.33' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '16 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 14 - 16' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 10 - 14' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 8 - 10' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamiVarConcelho11_01 = function(){
    var sliderAlojFamiVarConcelho11_01 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 48){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamiVarConcelho11_01, {
        start: [minAlojFamiVarConcelho11_01, maxAlojFamiVarConcelho11_01],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiVarConcelho11_01,
            'max': maxAlojFamiVarConcelho11_01
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamiVarConcelho11_01);
    inputNumberMax.setAttribute("value",maxAlojFamiVarConcelho11_01);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamiVarConcelho11_01.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamiVarConcelho11_01.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamiVarConcelho11_01.noUiSlider.on('update',function(e){
        AlojFamiVarConcelho11_01.eachLayer(function(layer){
            if(layer.feature.properties.VAF11_01>=parseFloat(e[0])&& layer.feature.properties.VAF11_01 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamiVarConcelho11_01.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 48;
    sliderAtivo = sliderAlojFamiVarConcelho11_01.noUiSlider;
    $(slidersGeral).append(sliderAlojFamiVarConcelho11_01);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES dos Concelhos entre 2021 e 2011-------------- \\\\\\



//////------- Variação DE ALOJAMENTOS FAmiliares CLÁSSICOS Concelhos entre 2011 e 2001 -----////


function CorAlojFamiClassVarConcelho11_01(d) {
    return d > 20 ? 'rgb(255,82,82)':
    d > 16  ? 'rgb(255,186,186)' :
    d > 14 ? 'rgb(255,247,192)' :
    d > 10  ? 'rgb(62,123,169)' :
    d > 8   ? 'rgb(14,89,147)' :
              '';
}
var minAlojFamiClassVarConcelho11_01 = 0;
var maxAlojFamiClassVarConcelho11_01 = 0;

function EstiloAlojFamiClassVarConcelho11_01(feature) {
    if(feature.properties.VAFC11_01 <= minAlojFamiClassVarConcelho11_01 || minAlojFamiClassVarConcelho11_01 ===0){
        minAlojFamiClassVarConcelho11_01 = feature.properties.VAFC11_01 - 0.01
    }
    if(feature.properties.VAFC11_01 > maxAlojFamiClassVarConcelho11_01){
        maxAlojFamiClassVarConcelho11_01 = feature.properties.VAFC11_01 + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamiClassVarConcelho11_01(feature.properties.VAFC11_01)};
    }


function apagarAlojFamiClassVarConcelho11_01(e) {
    AlojFamiClassVarConcelho11_01.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamiClassVarConcelho11_01 = L.control();

infoAlojFamiClassVarConcelho11_01.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojFamiClassVarConcelho11_01.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Familiares Clássicos entre 2011 e 2001</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VAFC11_01.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamiClassVarConcelho11_01(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamiClassVarConcelho11_01.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamiClassVarConcelho11_01(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VAFC11_01.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamiClassVarConcelho11_01,
        mouseout: apagarAlojFamiClassVarConcelho11_01,
    });
}
var AlojFamiClassVarConcelho11_01= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamiClassVarConcelho11_01,
    onEachFeature: onEachFeatureAlojFamiClassVarConcelho11_01
});
var LegendaAlojFamiClassVarConcelhos = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Familiares Clássicos entre 2011 e 2001'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 22.9' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '16 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 14 - 16' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 10 - 14' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 8 - 10' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamiClassVarConcelho11_01 = function(){
    var sliderAlojFamiClassVarConcelho11_01 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 49){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamiClassVarConcelho11_01, {
        start: [minAlojFamiClassVarConcelho11_01, maxAlojFamiClassVarConcelho11_01],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiClassVarConcelho11_01,
            'max': maxAlojFamiClassVarConcelho11_01
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamiClassVarConcelho11_01);
    inputNumberMax.setAttribute("value",maxAlojFamiClassVarConcelho11_01);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamiClassVarConcelho11_01.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamiClassVarConcelho11_01.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamiClassVarConcelho11_01.noUiSlider.on('update',function(e){
        AlojFamiClassVarConcelho11_01.eachLayer(function(layer){
            if(layer.feature.properties.VAFC11_01>=parseFloat(e[0])&& layer.feature.properties.VAFC11_01 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamiClassVarConcelho11_01.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 49;
    sliderAtivo = sliderAlojFamiClassVarConcelho11_01.noUiSlider;
    $(slidersGeral).append(AlojFamiClassVarConcelho11_01);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES dos Concelhos entre 2021 e 2011 -------------- \\\\\\

//////------- Variação dos ALOJAMENTOS FAMILIARES NÃO CLÁSSICOS dos Concelhos entre 2011 e 2001-----////


function CorAlojFamiNaoClassVarConcelho11_01(d) {
    return d > 100  ? 'rgb(255,82,82)' :
    d > 50 ? 'rgb(255,186,186)' :
    d > 0  ? 'rgb(255,247,192)' :
    d > -50.1   ? 'rgb(62,123,169)' :
    d > -100.02   ? 'rgb(14,89,147)' :
              '';
}
var minAlojFamiNaoClassVarConcelho11_01 = 0;
var maxAlojFamiNaoClassVarConcelho11_01 = 0;

function EstiloAlojFamiNaoClassVarConcelho11_01(feature) {
    if(feature.properties.VAFNC11_01 <= minAlojFamiNaoClassVarConcelho11_01 || minAlojFamiNaoClassVarConcelho11_01 ===0){
        minAlojFamiNaoClassVarConcelho11_01 = feature.properties.VAFNC11_01 - 0.01
    }
    if(feature.properties.VAFNC11_01 > maxAlojFamiNaoClassVarConcelho11_01){
        maxAlojFamiNaoClassVarConcelho11_01 = feature.properties.VAFNC11_01 + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamiNaoClassVarConcelho11_01(feature.properties.VAFNC11_01)};
    }


function apagarAlojFamiNaoClassVarConcelho11_01(e) {
    AlojFamiNaoClassVarConcelho11_01.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamiNaoClassVarConcelho11_01 = L.control();

infoAlojFamiNaoClassVarConcelho11_01.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojFamiNaoClassVarConcelho11_01.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Familiares Não Clássicos entre 2011 e 2001</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VAFNC11_01.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamiNaoClassVarConcelho11_01(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamiNaoClassVarConcelho11_01.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamiNaoClassVarConcelho11_01(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VAFNC11_01.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamiNaoClassVarConcelho11_01,
        mouseout: apagarAlojFamiNaoClassVarConcelho11_01,
    });
}
var AlojFamiNaoClassVarConcelho11_01= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamiNaoClassVarConcelho11_01,
    onEachFeature: onEachFeatureAlojFamiNaoClassVarConcelho11_01
});
var LegendaAlojFamiNaoClassVarConcelhos = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Familiares Não Clássicos entre 2011 e 2001'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 100 - 162.51' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '50 - 100' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 50' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -50' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -50 - -100' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamiNaoClassVarConcelho11_01 = function(){
    var sliderAlojFamiNaoClassVarConcelho11_01 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 50){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamiNaoClassVarConcelho11_01, {
        start: [minAlojFamiNaoClassVarConcelho11_01, maxAlojFamiNaoClassVarConcelho11_01],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamiNaoClassVarConcelho11_01,
            'max': maxAlojFamiNaoClassVarConcelho11_01
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamiNaoClassVarConcelho11_01);
    inputNumberMax.setAttribute("value",maxAlojFamiNaoClassVarConcelho11_01);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamiNaoClassVarConcelho11_01.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamiNaoClassVarConcelho11_01.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamiNaoClassVarConcelho11_01.noUiSlider.on('update',function(e){
        AlojFamiNaoClassVarConcelho11_01.eachLayer(function(layer){
            if(layer.feature.properties.VAFNC11_01>=parseFloat(e[0])&& layer.feature.properties.VAFNC11_01 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamiNaoClassVarConcelho11_01.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 50;
    sliderAtivo = sliderAlojFamiNaoClassVarConcelho11_01.noUiSlider;
    $(slidersGeral).append(sliderAlojFamiNaoClassVarConcelho11_01);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES  NÃO CLÁSSICOS dos Concelhos entre 2011 e 2001 -------------- \\\\\\


//////------- Variação dos ALOJAMENTOS FAMILIARES Coletivos dos Concelhos entre 2011 e 2001-----////


function CorAlojColetivosVarConcelho11_01(d) {
    return d > 10 ? 'rgb(255,186,186)' :
    d > 0  ? 'rgb(255,247,192)' :
    d > -30   ? 'rgb(62,123,169)' :
    d > -61.92   ? 'rgb(14,89,147)' :
              '';
}
var minAlojColetivosVarConcelho11_01 = 0;
var maxAlojColetivosVarConcelho11_01 = 0;

function EstiloAlojColetivosVarConcelho11_01(feature) {
    if(feature.properties.VAC11_01 <= minAlojColetivosVarConcelho11_01 || minAlojColetivosVarConcelho11_01 ===0){
        minAlojColetivosVarConcelho11_01 = feature.properties.VAC11_01 - 0.01
    }
    if(feature.properties.VAC11_01 > maxAlojColetivosVarConcelho11_01){
        maxAlojColetivosVarConcelho11_01 = feature.properties.VAC11_01 + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojColetivosVarConcelho11_01(feature.properties.VAC11_01)};
    }


function apagarAlojColetivosVarConcelho11_01(e) {
    AlojColetivosVarConcelho11_01.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojColetivosVarConcelho11_01 = L.control();

infoAlojColetivosVarConcelho11_01.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojColetivosVarConcelho11_01.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Coletivos entre 2011 e 2001</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.VAC11_01.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojColetivosVarConcelho11_01(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojColetivosVarConcelho11_01.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojColetivosVarConcelho11_01(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VAC11_01.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojColetivosVarConcelho11_01,
        mouseout: apagarAlojColetivosVarConcelho11_01,
    });
}
var AlojColetivosVarConcelho11_01= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojColetivosVarConcelho11_01,
    onEachFeature: onEachFeatureAlojColetivosVarConcelho11_01
});
var LegendaAlojColetivosVarConcelho11_01 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Coletivos entre 2011 e 2001'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '10 - 23.54' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -30' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -30 - -61.92' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojColetivosVarConcelho11_01 = function(){
    var sliderAlojColetivosVarConcelho11_01 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 51){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojColetivosVarConcelho11_01, {
        start: [minAlojColetivosVarConcelho11_01, maxAlojColetivosVarConcelho11_01],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojColetivosVarConcelho11_01,
            'max': maxAlojColetivosVarConcelho11_01
        },
        });
    inputNumberMin.setAttribute("value",minAlojColetivosVarConcelho11_01);
    inputNumberMax.setAttribute("value",maxAlojColetivosVarConcelho11_01);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojColetivosVarConcelho11_01.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojColetivosVarConcelho11_01.noUiSlider.set([null, this.value]);
    });

    sliderAlojColetivosVarConcelho11_01.noUiSlider.on('update',function(e){
        AlojColetivosVarConcelho11_01.eachLayer(function(layer){
            if(layer.feature.properties.VAC11_01>=parseFloat(e[0])&& layer.feature.properties.VAC11_01 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojColetivosVarConcelho11_01.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 51;
    sliderAtivo = sliderAlojColetivosVarConcelho11_01.noUiSlider;
    $(slidersGeral).append(sliderAlojColetivosVarConcelho11_01);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES Coletivos dos Concelhos entre 2011 e 2001 -------------- \\\\\\


//////------- Variação dos ALOJAMENTOS das Freguesias entre 2021 e 2011-----////


function CorVarTotalAlojFreg21(d) {
    return d > 4  ? 'rgb(255,82,82)' :
        d > 2 ? 'rgb(255,186,186)' :
        d > 0  ? 'rgb(255,247,192)' :
        d > -1   ? 'rgb(62,123,169)' :
        d > -3.09   ? 'rgb(14,89,147)' :
                  '';
    }
var minVarTotalAlojFreg21 = 0;
var maxVarTotalAlojFreg21 = 1;

function EstiloVarTotalAlojFreg21(feature) {
    if(feature.properties.VarTotal21 <= minVarTotalAlojFreg21 || minVarTotalAlojFreg21 ===0){
        minVarTotalAlojFreg21 = feature.properties.VarTotal21 - 0.01
    }
    if(feature.properties.VarTotal21 > maxVarTotalAlojFreg21){
        maxVarTotalAlojFreg21 = feature.properties.VarTotal21 + 0.01
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorVarTotalAlojFreg21(feature.properties.VarTotal21)};
    }


function apagarVarTotalAlojFreg21(e) {
    VarTotalAlojFreg21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoVarTotalAlojFreg21 = L.control();

infoVarTotalAlojFreg21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoVarTotalAlojFreg21.update = function (feature) {
    this._div.innerHTML = '<h4>Variação do Total de Alojamentos entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.VarTotal21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureVarTotalAlojFreg21(e) {
    var layer = e.target;
    layer.openPopup();
    infoVarTotalAlojFreg21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureVarTotalAlojFreg21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarTotal21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureVarTotalAlojFreg21,
        mouseout: apagarVarTotalAlojFreg21,
    });
}
var VarTotalAlojFreg21= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloVarTotalAlojFreg21,
    onEachFeature: onEachFeatureVarTotalAlojFreg21
});
var LegendaVarTotalAlojFreg21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação do Total de Alojamentos entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + '10 - 23.54' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -30' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -30 - -61.92' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideVarTotalAlojFreg21 = function(){
    var sliderVarTotalAlojFreg21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 26){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderVarTotalAlojFreg21, {
        start: [minVarTotalAlojFreg21, maxVarTotalAlojFreg21],
        tooltips:true,
        connect: true,
        range: {
            'min': minVarTotalAlojFreg21,
            'max': maxVarTotalAlojFreg21
        },
        });
    inputNumberMin.setAttribute("value",minVarTotalAlojFreg21);
    inputNumberMax.setAttribute("value",maxVarTotalAlojFreg21);

    inputNumberMin.addEventListener('change', function(){
        sliderVarTotalAlojFreg21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderVarTotalAlojFreg21.noUiSlider.set([null, this.value]);
    });

    sliderVarTotalAlojFreg21.noUiSlider.on('update',function(e){
        VarTotalAlojFreg21.eachLayer(function(layer){
            if(layer.feature.properties.VarTotal21>=parseFloat(e[0])&& layer.feature.properties.VarTotal21 <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderVarTotalAlojFreg21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 26;
    sliderAtivo = sliderVarTotalAlojFreg21.noUiSlider;
    $(slidersGeral).append(sliderVarTotalAlojFreg21);
} 

///// Fim da Variação dos ALOJAMENTOS Por Freguesia -------------- \\\\\\


//////------- Variação dos ALOJAMENTOS das Freguesias entre 2021 e 2011-----////


function CorVarTotalAlojFamiFreg21(d) {
    return d >= 4  ? 'rgb(255,82,82)' :
        d >= 2 ? 'rgb(255,186,186)' :
        d >= 0  ? 'rgb(255,247,192)' :
        d >= -3   ? 'rgb(62,123,169)' :
        d >= -11.9   ? 'rgb(14,89,147)' :
                  '';
    }
var minVarTotalAlojFamiFreg21 = 0;
var maxVarTotalAlojFamiFreg21 = 1;

function EstiloVarTotalAlojFamiFreg21(feature) {
    if(feature.properties.VarAlojFam <= minVarTotalAlojFamiFreg21 || minVarTotalAlojFamiFreg21 ===0){
        minVarTotalAlojFamiFreg21 = feature.properties.VarAlojFam - 0.01
    }
    if(feature.properties.VarAlojFam > maxVarTotalAlojFamiFreg21){
        maxVarTotalAlojFamiFreg21 = feature.properties.VarAlojFam + 0.011
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorVarTotalAlojFamiFreg21(feature.properties.VarAlojFam)};
    }


function apagarVarTotalAlojFamiFreg21(e) {
    VarTotalAlojFamiFreg21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoVarTotalAlojFamiFreg21 = L.control();

infoVarTotalAlojFamiFreg21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoVarTotalAlojFamiFreg21.update = function (feature) {
    this._div.innerHTML = '<h4>Variação do Total de Alojamentos Familiares entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.VarAlojFam.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureVarTotalAlojFamiFreg21(e) {
    var layer = e.target;
    layer.openPopup();
    infoVarTotalAlojFamiFreg21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureVarTotalAlojFamiFreg21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarAlojFam.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureVarTotalAlojFamiFreg21,
        mouseout: apagarVarTotalAlojFamiFreg21,
    });
}
var VarTotalAlojFamiFreg21= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloVarTotalAlojFamiFreg21,
    onEachFeature: onEachFeatureVarTotalAlojFamiFreg21
});
var LegendaVarTotalAlojFamiFreg21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação do Total de Alojamentos Familiares entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + '4 - 9.26' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 2 - 4' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -3' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -3 - -11.9' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideVarTotalAlojFamiFreg21 = function(){
    var sliderVarTotalAlojFamiFreg21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 27){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderVarTotalAlojFamiFreg21, {
        start: [minVarTotalAlojFamiFreg21, maxVarTotalAlojFamiFreg21],
        tooltips:true,
        connect: true,
        range: {
            'min': minVarTotalAlojFamiFreg21,
            'max': maxVarTotalAlojFamiFreg21
        },
        });
    inputNumberMin.setAttribute("value",minVarTotalAlojFamiFreg21);
    inputNumberMax.setAttribute("value",maxVarTotalAlojFamiFreg21);

    inputNumberMin.addEventListener('change', function(){
        sliderVarTotalAlojFamiFreg21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderVarTotalAlojFamiFreg21.noUiSlider.set([null, this.value]);
    });

    sliderVarTotalAlojFamiFreg21.noUiSlider.on('update',function(e){
        VarTotalAlojFamiFreg21.eachLayer(function(layer){
            if(layer.feature.properties.VarAlojFam>=parseFloat(e[0])&& layer.feature.properties.VarAlojFam <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderVarTotalAlojFamiFreg21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 27;
    sliderAtivo = sliderVarTotalAlojFamiFreg21.noUiSlider;
    $(slidersGeral).append(sliderVarTotalAlojFamiFreg21);
} 

///// Fim da Variação dos ALOJAMENTOS Familiares Por Freguesia entre 2021 e 2011 -------------- \\\\\\

//////------- Variação dos ALOJAMENTOS FAMILIARES CLÁSSICOS das Freguesias entre 2021 e 2011-----////


function CorVarTotalAlojFamiClassFreg21(d) {
    return d >= 4  ? 'rgb(255,82,82)' :
        d >= 2 ? 'rgb(255,186,186)' :
        d >= 0  ? 'rgb(255,247,192)' :
        d >= -3   ? 'rgb(62,123,169)' :
        d >= -11.9   ? 'rgb(14,89,147)' :
                  '';
    }
var minVarTotalAlojFamiClassFreg21 = 0;
var maxVarTotalAlojFamiClassFreg21 = 0;

function EstiloVarTotalAlojFamiClassFreg21(feature) {
    if(feature.properties.VarALClass <= minVarTotalAlojFamiClassFreg21 || minVarTotalAlojFamiClassFreg21 ===0){
        minVarTotalAlojFamiClassFreg21 = feature.properties.VarALClass - 0.01
    }
    if(feature.properties.VarALClass > maxVarTotalAlojFamiClassFreg21){
        maxVarTotalAlojFamiClassFreg21 = feature.properties.VarALClass + 0.011
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorVarTotalAlojFamiClassFreg21(feature.properties.VarALClass)};
    }


function apagarVarTotalAlojFamiClassFreg21(e) {
    VarTotalAlojFamiClassFreg21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoVarTotalAlojFamiClassFreg21 = L.control();

infoVarTotalAlojFamiClassFreg21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoVarTotalAlojFamiClassFreg21.update = function (feature) {
    this._div.innerHTML = '<h4>Variação do Total de Alojamentos Familiares Clássicos entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.VarALClass.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureVarTotalAlojFamiClassFreg21(e) {
    var layer = e.target;
    layer.openPopup();
    infoVarTotalAlojFamiClassFreg21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureVarTotalAlojFamiClassFreg21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarALClass.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureVarTotalAlojFamiClassFreg21,
        mouseout: apagarVarTotalAlojFamiClassFreg21,
    });
}
var VarTotalAlojFamiClassFreg21= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloVarTotalAlojFamiClassFreg21,
    onEachFeature: onEachFeatureVarTotalAlojFamiClassFreg21
});
var LegendaVarTotalAlojFamiClassFreg21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação do Total de Alojamentos Familiares Clássicos entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + '4 - 9.26' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 2 - 4' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0 - 2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -3' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -3 - -11.82' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideVarTotalAlojFamiClassFreg21 = function(){
    var sliderVarTotalAlojFamiClassFreg21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 28){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderVarTotalAlojFamiClassFreg21, {
        start: [minVarTotalAlojFamiClassFreg21, maxVarTotalAlojFamiClassFreg21],
        tooltips:true,
        connect: true,
        range: {
            'min': minVarTotalAlojFamiClassFreg21,
            'max': maxVarTotalAlojFamiClassFreg21
        },
        });
    inputNumberMin.setAttribute("value",minVarTotalAlojFamiClassFreg21);
    inputNumberMax.setAttribute("value",maxVarTotalAlojFamiClassFreg21);

    inputNumberMin.addEventListener('change', function(){
        sliderVarTotalAlojFamiClassFreg21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderVarTotalAlojFamiClassFreg21.noUiSlider.set([null, this.value]);
    });

    sliderVarTotalAlojFamiClassFreg21.noUiSlider.on('update',function(e){
        VarTotalAlojFamiClassFreg21.eachLayer(function(layer){
            if(layer.feature.properties.VarALClass>=parseFloat(e[0])&& layer.feature.properties.VarALClass <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderVarTotalAlojFamiClassFreg21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 28;
    sliderAtivo = sliderVarTotalAlojFamiClassFreg21.noUiSlider;
    $(slidersGeral).append(sliderVarTotalAlojFamiClassFreg21);
} 

///// Fim da Variação dos ALOJAMENTOS Familiares Clássicos Por Freguesia entre 2021 e 2011 -------------- \\\\\\

//////------- Variação dos ALOJAMENTOS FAMILIARES NÃO CLÁSSICOS das Freguesias entre 2021 e 2011-----////


function CorVarTotAlojFamNaoClassFreg21(d) {
    return d >= 100  ? 'rgb(255,82,82)' :
        d >= 0.1 ? 'rgb(255,186,186)' :
        d >= -0.1  ? 'rgb(255,247,192)' :
        d >= -50   ? 'rgb(62,123,169)' :
        d >= -100.5   ? 'rgb(14,89,147)' :
                  '';
    }
var minVarTotAlojFamNaoClassFreg21 = 0;
var maxVarTotAlojFamNaoClassFreg21 = 0;

function EstiloVarTotAlojFamNaoClassFreg21(feature) {
    if(feature.properties.VarNClass <= minVarTotAlojFamNaoClassFreg21 || minVarTotAlojFamNaoClassFreg21 ===0){
        minVarTotAlojFamNaoClassFreg21 = feature.properties.VarNClass - 0.01
    }
    if(feature.properties.VarNClass > maxVarTotAlojFamNaoClassFreg21){
        maxVarTotAlojFamNaoClassFreg21 = feature.properties.VarNClass + 0.011
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorVarTotAlojFamNaoClassFreg21(feature.properties.VarNClass)};
    }


function apagarVarTotAlojFamNaoClassFreg21(e) {
    VarTotAlojFamNaoClassFreg21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoVarTotAlojFamNaoClassFreg21 = L.control();

infoVarTotAlojFamNaoClassFreg21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoVarTotAlojFamNaoClassFreg21.update = function (feature) {
    this._div.innerHTML = '<h4>Variação do Total de Alojamentos Familiares Não Clássicos entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.VarNClass.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureVarTotAlojFamNaoClassFreg21(e) {
    var layer = e.target;
    layer.openPopup();
    infoVarTotAlojFamNaoClassFreg21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureVarTotAlojFamNaoClassFreg21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarNClass.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureVarTotAlojFamNaoClassFreg21,
        mouseout: apagarVarTotAlojFamNaoClassFreg21,
    });
}
var VarTotAlojFamNaoClassFreg21= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloVarTotAlojFamNaoClassFreg21,
    onEachFeature: onEachFeatureVarTotAlojFamNaoClassFreg21
});
var LegendaVarTotAlojFamNaoClassFreg21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação do Total de Alojamentos Familiares Não Clássicos entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + '100 - 2000' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 0.1 - 100' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -50' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -50 - -100' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideVarTotAlojFamNaoClassFreg21 = function(){
    var sliderVarTotAlojFamNaoClassFreg21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 29){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderVarTotAlojFamNaoClassFreg21, {
        start: [minVarTotAlojFamNaoClassFreg21, maxVarTotAlojFamNaoClassFreg21],
        tooltips:true,
        connect: true,
        range: {
            'min': minVarTotAlojFamNaoClassFreg21,
            'max': maxVarTotAlojFamNaoClassFreg21
        },
        });
    inputNumberMin.setAttribute("value",minVarTotAlojFamNaoClassFreg21);
    inputNumberMax.setAttribute("value",maxVarTotAlojFamNaoClassFreg21);

    inputNumberMin.addEventListener('change', function(){
        sliderVarTotAlojFamNaoClassFreg21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderVarTotAlojFamNaoClassFreg21.noUiSlider.set([null, this.value]);
    });

    sliderVarTotAlojFamNaoClassFreg21.noUiSlider.on('update',function(e){
        VarTotAlojFamNaoClassFreg21.eachLayer(function(layer){
            if(layer.feature.properties.VarNClass>=parseFloat(e[0])&& layer.feature.properties.VarNClass <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderVarTotAlojFamNaoClassFreg21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 29;
    sliderAtivo = sliderVarTotAlojFamNaoClassFreg21.noUiSlider;
    $(slidersGeral).append(sliderVarTotAlojFamNaoClassFreg21);
} 

///// Fim da Variação dos ALOJAMENTOS FAMILIARES NÃO CLÁSSICOS Por Freguesia entre 2021 e 2011 -------------- \\\\\\

//////------- Variação dos ALOJAMENTOS COLETIVOS das Freguesias entre 2021 e 2011-----////


function CorVarAlojColetivosFreg21(d) {
    return d >= 100.1  ? 'rgb(255,82,82)' :
        d >= 0.1 ? 'rgb(255,186,186)' :
        d >= -0.1  ? 'rgb(255,247,192)' :
        d >= -50   ? 'rgb(62,123,169)' :
        d >= -100.5   ? 'rgb(14,89,147)' :
                  '';
    }
var minVarAlojColetivosFreg21 = 0;
var maxVarAlojColetivosFreg21 = 0;

function EstiloVarAlojColetivosFreg21(feature) {
    if(feature.properties.VarAloCole <= minVarAlojColetivosFreg21 || minVarAlojColetivosFreg21 ===0){
        minVarAlojColetivosFreg21 = feature.properties.VarAloCole - 0.01
    }
    if(feature.properties.VarAloCole > maxVarAlojColetivosFreg21){
        maxVarAlojColetivosFreg21 = feature.properties.VarAloCole + 0.011
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorVarAlojColetivosFreg21(feature.properties.VarAloCole)};
    }


function apagarVarAlojColetivosFreg21(e) {
    VarAlojColetivosFreg21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoVarAlojColetivosFreg21 = L.control();

infoVarAlojColetivosFreg21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoVarAlojColetivosFreg21.update = function (feature) {
    this._div.innerHTML = '<h4>Variação de Alojamentos Coletivos entre 2021 e 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.VarAloCole.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureVarAlojColetivosFreg21(e) {
    var layer = e.target;
    layer.openPopup();
    infoVarAlojColetivosFreg21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureVarAlojColetivosFreg21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.VarAloCole.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureVarAlojColetivosFreg21,
        mouseout: apagarVarAlojColetivosFreg21,
    });
}
var VarAlojColetivosFreg21= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloVarAlojColetivosFreg21,
    onEachFeature: onEachFeatureVarAlojColetivosFreg21
});
var LegendaVarAlojColetivosFreg21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Variação de Alojamentos Coletivos entre 2021 e 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + '100 - 500' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 0.1 - 100' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 0' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 0 - -50' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' -50 - -100' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideVarAlojColetivosFreg21 = function(){
    var sliderVarAlojColetivosFreg21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 30){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderVarAlojColetivosFreg21, {
        start: [minVarAlojColetivosFreg21, maxVarAlojColetivosFreg21],
        tooltips:true,
        connect: true,
        range: {
            'min': minVarAlojColetivosFreg21,
            'max': maxVarAlojColetivosFreg21
        },
        });
    inputNumberMin.setAttribute("value",minVarAlojColetivosFreg21);
    inputNumberMax.setAttribute("value",maxVarAlojColetivosFreg21);

    inputNumberMin.addEventListener('change', function(){
        sliderVarAlojColetivosFreg21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderVarAlojColetivosFreg21.noUiSlider.set([null, this.value]);
    });

    sliderVarAlojColetivosFreg21.noUiSlider.on('update',function(e){
        VarAlojColetivosFreg21.eachLayer(function(layer){
            if(layer.feature.properties.VarAloCole>=parseFloat(e[0])&& layer.feature.properties.VarAloCole <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderVarAlojColetivosFreg21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 30;
    sliderAtivo = sliderVarAlojColetivosFreg21.noUiSlider;
    $(slidersGeral).append(sliderVarAlojColetivosFreg21);
} 

///// Fim da Variação dos ALOJAMENTOS COLETIVOS Por Freguesia entre 2021 e 2011 -------------- \\\\\\

//////------- PERCENTAGEM CONCELHOS-----////




//////------- Percentagem Total de Alojamentos Familiares por Concelho em 2021-----////

function CorTotAlojFamPercCon21(d) {
    return d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d > 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minTotAlojFamPercCon21 = 0;
var maxTotAlojFamPercCon21 = 0;

function EstiloTotAlojFamPercCon21(feature) {
    if( feature.properties.AlojFam21 < minTotAlojFamPercCon21 || minTotAlojFamPercCon21 === 0){
        minTotAlojFamPercCon21 = feature.properties.AlojFam21
    }
    if(feature.properties.AlojFam21 > maxTotAlojFamPercCon21 ){
        maxTotAlojFamPercCon21 = feature.properties.AlojFam21
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorTotAlojFamPercCon21(feature.properties.AlojFam21)
    };
}


function apagarTotAlojFamPercCon21(e) {
    TotAlojFamPercCon21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoTotAlojFamPercCon21 = L.control();

infoTotAlojFamPercCon21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoTotAlojFamPercCon21.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AlojFam21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureTotAlojFamPercCon21(e) {
    var layer = e.target;
    layer.openPopup();
    infoTotAlojFamPercCon21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureTotAlojFamPercCon21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AlojFam21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureTotAlojFamPercCon21,
        mouseout: apagarTotAlojFamPercCon21,
    });
}
var TotAlojFamPercCon21= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloTotAlojFamPercCon21,
    onEachFeature: onEachFeatureTotAlojFamPercCon21
});
var LegendaTotAlojFamPercCon21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares em 2021'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    // symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 25' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 17.2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideTotAlojFamPercCon21 = function(){
    var sliderTotAlojFamPercCon21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 33){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderTotAlojFamPercCon21, {
        start: [minTotAlojFamPercCon21, maxTotAlojFamPercCon21],
        tooltips:true,
        connect: true,
        range: {
            'min': minTotAlojFamPercCon21,
            'max': maxTotAlojFamPercCon21
        },
        });
    inputNumberMin.setAttribute("value",minTotAlojFamPercCon21);
    inputNumberMax.setAttribute("value",maxTotAlojFamPercCon21);

    inputNumberMin.addEventListener('change', function(){
        sliderTotAlojFamPercCon21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderTotAlojFamPercCon21.noUiSlider.set([null, this.value]);
    });

    sliderTotAlojFamPercCon21.noUiSlider.on('update',function(e){
        TotAlojFamPercCon21.eachLayer(function(layer){
            if(layer.feature.properties.AlojFam21.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AlojFam21.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderTotAlojFamPercCon21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 33;
    sliderAtivo = sliderTotAlojFamPercCon21.noUiSlider;
    $(slidersGeral).append(sliderTotAlojFamPercCon21);
} 

///// Fim da Percentagem do Total de Alojamentos Familiares em 2021 -------------- \\\\\\

//////------- Percentagem Total de Alojamentos Familiares por Concelho em 2011-----////

function CorTotAlojFamPercCon11(d) {
    return d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d > 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minTotAlojFamPercCon11 = 0;
var maxTotAlojFamPercCon11 = 0;

function EstiloTotAlojFamPercCon11(feature) {
    if( feature.properties.AlojFam11 < minTotAlojFamPercCon11 || minTotAlojFamPercCon11 === 0){
        minTotAlojFamPercCon11 = feature.properties.AlojFam11
    }
    if(feature.properties.AlojFam11 > maxTotAlojFamPercCon11 ){
        maxTotAlojFamPercCon11 = feature.properties.AlojFam11
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorTotAlojFamPercCon11(feature.properties.AlojFam11)
    };
}


function apagarTotAlojFamPercCon11(e) {
    TotAlojFamPercCon11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoTotAlojFamPercCon11 = L.control();

infoTotAlojFamPercCon11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoTotAlojFamPercCon11.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AlojFam11.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureTotAlojFamPercCon11(e) {
    var layer = e.target;
    layer.openPopup();
    infoTotAlojFamPercCon11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureTotAlojFamPercCon11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AlojFam11.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureTotAlojFamPercCon11,
        mouseout: apagarTotAlojFamPercCon11,
    });
}
var TotAlojFamPercCon11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloTotAlojFamPercCon11,
    onEachFeature: onEachFeatureTotAlojFamPercCon11
});
var LegendaTotAlojFamPercCon11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares em 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    // symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 25' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 17.2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideTotAlojFamPercCon11 = function(){
    var sliderTotAlojFamPercCon11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 34){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderTotAlojFamPercCon11, {
        start: [minTotAlojFamPercCon11, maxTotAlojFamPercCon11],
        tooltips:true,
        connect: true,
        range: {
            'min': minTotAlojFamPercCon11,
            'max': maxTotAlojFamPercCon11
        },
        });
    inputNumberMin.setAttribute("value",minTotAlojFamPercCon11);
    inputNumberMax.setAttribute("value",maxTotAlojFamPercCon11);

    inputNumberMin.addEventListener('change', function(){
        sliderTotAlojFamPercCon11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderTotAlojFamPercCon11.noUiSlider.set([null, this.value]);
    });

    sliderTotAlojFamPercCon11.noUiSlider.on('update',function(e){
        TotAlojFamPercCon11.eachLayer(function(layer){
            if(layer.feature.properties.AlojFam11.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AlojFam11.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderTotAlojFamPercCon11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 34;
    sliderAtivo = sliderTotAlojFamPercCon11.noUiSlider;
    $(slidersGeral).append(sliderTotAlojFamPercCon11);
} 

///// Fim da Percentagem do Total de Alojamentos Familiares em 2011 -------------- \\\\\\

//////------- Percentagem Total de Alojamentos Familiares por Concelho em 2021-----////

function CorAlojFamClassPercCon21(d) {
    return d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d > 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minAlojFamClassPercCon21 = 0;
var maxAlojFamClassPercCon21 = 0;

function EstiloAlojFamClassPercCon21(feature) {
    if( feature.properties.AloFamCl21 < minAlojFamClassPercCon21 || minAlojFamClassPercCon21 === 0){
        minAlojFamClassPercCon21 = feature.properties.AloFamCl21
    }
    if(feature.properties.AloFamCl21 > maxAlojFamClassPercCon21 ){
        maxAlojFamClassPercCon21 = feature.properties.AloFamCl21
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamClassPercCon21(feature.properties.AloFamCl21)
    };
}


function apagarAlojFamClassPercCon21(e) {
    AlojFamClassPercCon21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamClassPercCon21 = L.control();

infoAlojFamClassPercCon21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
infoAlojFamClassPercCon21.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares Clássicos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AloFamCl21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamClassPercCon21(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamClassPercCon21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamClassPercCon21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AloFamCl21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamClassPercCon21,
        mouseout: apagarAlojFamClassPercCon21,
    });
}
var AlojFamClassPercCon21= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamClassPercCon21,
    onEachFeature: onEachFeatureAlojFamClassPercCon21
});
var LegendaAlojFamClassPercCon21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares Clássicos em 2021'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    // symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 25' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 17.2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamClassPercCon21 = function(){
    var sliderAlojFamClassPercCon21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 35){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamClassPercCon21, {
        start: [minAlojFamClassPercCon21, maxAlojFamClassPercCon21],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamClassPercCon21,
            'max': maxAlojFamClassPercCon21
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamClassPercCon21);
    inputNumberMax.setAttribute("value",maxAlojFamClassPercCon21);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamClassPercCon21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamClassPercCon21.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamClassPercCon21.noUiSlider.on('update',function(e){
        AlojFamClassPercCon21.eachLayer(function(layer){
            if(layer.feature.properties.AloFamCl21.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AloFamCl21.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamClassPercCon21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 35;
    sliderAtivo = sliderAlojFamClassPercCon21.noUiSlider;
    $(slidersGeral).append(sliderAlojFamClassPercCon21);
} 

///// Fim da Percentagem do Total de Alojamentos Familiares Clássicos em 2021 -------------- \\\\\\

//////------- Percentagem Total de Alojamentos Familiares Clássicos por Concelho em 2011-----////

function CorAlojFamClassPercCon11(d) {
    return d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d > 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minAlojFamClassPercCon11 = 0;
var maxAlojFamClassPercCon11 = 0;

function EstiloAlojFamClassPercCon11(feature) {
    if( feature.properties.AloFamCl11 < minAlojFamClassPercCon11 || minAlojFamClassPercCon11 === 0){
        minAlojFamClassPercCon11 = feature.properties.AloFamCl11
    }
    if(feature.properties.AloFamCl11 > maxAlojFamClassPercCon11 ){
        maxAlojFamClassPercCon11 = feature.properties.AloFamCl11
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamClassPercCon11(feature.properties.AloFamCl11)
    };
}


function apagarAlojFamClassPercCon11(e) {
    AlojFamClassPercCon11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamClassPercCon11 = L.control();

infoAlojFamClassPercCon11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoAlojFamClassPercCon11.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares Clássicos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AloFamCl11.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamClassPercCon11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamClassPercCon11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamClassPercCon11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AloFamCl11.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamClassPercCon11,
        mouseout: apagarAlojFamClassPercCon11,
    });
}
var AlojFamClassPercCon11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamClassPercCon11,
    onEachFeature: onEachFeatureAlojFamClassPercCon11
});
var LegendaAlojFamClassPercCon11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares Clássicos em 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    // symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 25' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 17.2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamClassPercCon11 = function(){
    var sliderAlojFamClassPercCon11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 36){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamClassPercCon11, {
        start: [minAlojFamClassPercCon11, maxAlojFamClassPercCon11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojFamClassPercCon11,
            'max': maxAlojFamClassPercCon11
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamClassPercCon11);
    inputNumberMax.setAttribute("value",maxAlojFamClassPercCon11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamClassPercCon11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamClassPercCon11.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamClassPercCon11.noUiSlider.on('update',function(e){
        AlojFamClassPercCon11.eachLayer(function(layer){
            if(layer.feature.properties.AloFamCl11.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AloFamCl11.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamClassPercCon11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 36;
    sliderAtivo = sliderAlojFamClassPercCon11.noUiSlider;
    $(slidersGeral).append(sliderAlojFamClassPercCon11);
} 

///// Fim da Percentagem do Total de Alojamentos Familiares Clássicos em 2011 -------------- \\\\\\

//////------- Percentagem Total de Alojamentos Familiares Não Clássicos por Concelho em 2021-----////

function CorAlojFamNaoClasPercCon21(d) {
    return d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minAlojFamNaoClasPercCon21 = 0;
var maxAlojFamNaoClasPercCon21 = 0;

function EstiloAlojFamNaoClasPercCon21(feature) {
    if(feature.properties.AloFamNC21 <= minAlojFamNaoClasPercCon21 || minAlojFamNaoClasPercCon21 === 0){
        minAlojFamNaoClasPercCon21 = feature.properties.AloFamNC21
    }
    if(feature.properties.AloFamNC21 >= maxAlojFamNaoClasPercCon21 ){
        maxAlojFamNaoClasPercCon21 = feature.properties.AloFamNC21
    }

    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamNaoClasPercCon21(feature.properties.AloFamNC21)
    };
}


function apagarAlojFamNaoClasPercCon21(e) {
    AlojFamNaoClasPercCon21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamNaoClasPercCon21 = L.control();

infoAlojFamNaoClasPercCon21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoAlojFamNaoClasPercCon21.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares Não Clássicos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AloFamNC21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamNaoClasPercCon21(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamNaoClasPercCon21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamNaoClasPercCon21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AloFamNC21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamNaoClasPercCon21,
        mouseout: apagarAlojFamNaoClasPercCon21,
    });
}
var AlojFamNaoClasPercCon21= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamNaoClasPercCon21,
    onEachFeature: onEachFeatureAlojFamNaoClasPercCon21
});
var LegendaAlojFamNaoClasPercCon21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares Não Clássicos em 2021'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    // symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 25' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 17.2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamNaoClassPercCon21 = function(){
    var sliderAlojFamNaoClasPercCon21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 37){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamNaoClasPercCon21, {
        start: [0, maxAlojFamNaoClasPercCon21],
        tooltips:true,
        connect: true,
        range: {
            'min': 0,
            'max': maxAlojFamNaoClasPercCon21
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamNaoClasPercCon21);
    inputNumberMax.setAttribute("value",maxAlojFamNaoClasPercCon21);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamNaoClasPercCon21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamNaoClasPercCon21.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamNaoClasPercCon21.noUiSlider.on('update',function(e){
        AlojFamNaoClasPercCon21.eachLayer(function(layer){
            if(layer.feature.properties.AloFamNC21.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AloFamNC21.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
    sliderAlojFamNaoClasPercCon21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 37;
    sliderAtivo = sliderAlojFamNaoClasPercCon21.noUiSlider;
    $(slidersGeral).append(sliderAlojFamNaoClasPercCon21);
} 

///// Fim da Percentagem do Total de Alojamentos Familiares Não Clássicos em 2021 -------------- \\\\\\



//////------- Percentagem Total de Alojamentos Familiares Não Clássicos por Concelho em 2011-----////

function CorAlojFamNaoClasPercCon11(d) {
    return d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minAlojFamNaoClasPercCon11 = 0;
var maxAlojFamNaoClasPercCon11 = 0;

function EstiloAlojFamNaoClasPercCon11(feature) {
    if( feature.properties.AloFamNC21 <= minAlojFamNaoClasPercCon11 || minAlojFamNaoClasPercCon11 === 0){
        minAlojFamNaoClasPercCon11 = feature.properties.AloFamNC11
    }
    if(feature.properties.AloFamNC11 >= maxAlojFamNaoClasPercCon11 ){
        maxAlojFamNaoClasPercCon11 = feature.properties.AloFamNC11
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojFamNaoClasPercCon11(feature.properties.AloFamNC11)
    };
}


function apagarAlojFamNaoClasPercCon11(e) {
    AlojFamNaoClasPercCon11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojFamNaoClasPercCon11 = L.control();

infoAlojFamNaoClasPercCon11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoAlojFamNaoClasPercCon11.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares Não Clássicos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AloFamNC11.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojFamNaoClasPercCon11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojFamNaoClasPercCon11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojFamNaoClasPercCon11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AloFamNC11.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojFamNaoClasPercCon11,
        mouseout: apagarAlojFamNaoClasPercCon11,
    });
}
var AlojFamNaoClasPercCon11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojFamNaoClasPercCon11,
    onEachFeature: onEachFeatureAlojFamNaoClasPercCon11
});
var LegendaAlojFamNaoClasPercCon11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares Não Clássicos em 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    // symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 25' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 17.2' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojFamNaoClasPercCon11 = function(){
    var sliderAlojFamNaoClasPercCon11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 38){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojFamNaoClasPercCon11, {
        start: [0, maxAlojFamNaoClasPercCon11],
        tooltips:true,
        connect: true,
        range: {
            'min': 0,
            'max': maxAlojFamNaoClasPercCon11
        },
        });
    inputNumberMin.setAttribute("value",minAlojFamNaoClasPercCon11);
    inputNumberMax.setAttribute("value",maxAlojFamNaoClasPercCon11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojFamNaoClasPercCon11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojFamNaoClasPercCon11.noUiSlider.set([null, this.value]);
    });

    sliderAlojFamNaoClasPercCon11.noUiSlider.on('update',function(e){
        AlojFamNaoClasPercCon11.eachLayer(function(layer){
            if(layer.feature.properties.AloFamNC11.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AloFamNC11.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojFamNaoClasPercCon11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 38;
    sliderAtivo = sliderAlojFamNaoClasPercCon11.noUiSlider;
    $(slidersGeral).append(sliderAlojFamNaoClasPercCon11);
} 

///// Fim da Percentagem do Total de Alojamentos Familiares Não Clássicos em 2011 -------------- \\\\\\

//////------- Percentagem Total de Alojamentos Familiares Coletivos por Concelho em 2021-----////

function CorAlojColePercCon21(d) {
    return d > 20 ? 'rgb(255,82,82)':
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minAlojColePercCon21 = 0;
var maxAlojColePercCon21 = 0;

function EstiloAlojColePercCon21(feature) {
    if( feature.properties.AlojCole21 <= minAlojColePercCon21 || minAlojColePercCon21 === 0){
        minAlojColePercCon21 = feature.properties.AlojCole21
    }
    if(feature.properties.AlojCole21 >= maxAlojColePercCon21 ){
        maxAlojColePercCon21 = feature.properties.AlojCole21
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojColePercCon21(feature.properties.AlojCole21)
    };
}


function apagarAlojColePercCon21(e) {
    AlojColePercCon21.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojColePercCon21 = L.control();

infoAlojColePercCon21.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoAlojColePercCon21.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Coletivos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AlojCole21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojColePercCon21(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojColePercCon21.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojColePercCon21(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AlojCole21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojColePercCon21,
        mouseout: apagarAlojColePercCon21,
    });
}
var AlojColePercCon21= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojColePercCon21,
    onEachFeature: onEachFeatureAlojColePercCon21
});
var LegendaAlojColePercCon21 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Coletivos em 2021'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojColePercCon21 = function(){
    var sliderAlojColePercCon21 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 39){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojColePercCon21, {
        start: [minAlojColePercCon21, maxAlojColePercCon21],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojColePercCon21,
            'max': maxAlojColePercCon21
        },
        });
    inputNumberMin.setAttribute("value",minAlojColePercCon21);
    inputNumberMax.setAttribute("value",maxAlojColePercCon21);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojColePercCon21.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojColePercCon21.noUiSlider.set([null, this.value]);
    });

    sliderAlojColePercCon21.noUiSlider.on('update',function(e){
        AlojColePercCon21.eachLayer(function(layer){
            if(layer.feature.properties.AlojCole21.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AlojCole21.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojColePercCon21.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 39;
    sliderAtivo = sliderAlojColePercCon21.noUiSlider;
    $(slidersGeral).append(sliderAlojColePercCon21);
} 

///// Fim da Percentagem do Total de Alojamentos Familiares Coletivos em 2021 -------------- \\\\\\

//////------- Percentagem Total de Alojamentos Familiares Coletivos por Concelho em 2011-----////

function CorAlojColePercCon11(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minAlojColePercCon11 = 0;
var maxAlojColePercCon11 = 0;

function EstiloAlojColePercCon11(feature) {
    if( feature.properties.AlojCole11 <= minAlojColePercCon11 || minAlojColePercCon11 === 0){
        minAlojColePercCon11 = feature.properties.AlojCole11
    }
    if(feature.properties.AlojCole11 >= maxAlojColePercCon11 ){
        maxAlojColePercCon11 = feature.properties.AlojCole11
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorAlojColePercCon11(feature.properties.AlojCole11)
    };
}


function apagarAlojColePercCon11(e) {
    AlojColePercCon11.resetStyle(e.target)
    e.target.closePopup();

} 
let infoAlojColePercCon11 = L.control();

infoAlojColePercCon11.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoAlojColePercCon11.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Coletivos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Concelho + 
    '</b><br />'
    + feature.AlojCole11.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeatureAlojColePercCon11(e) {
    var layer = e.target;
    layer.openPopup();
    infoAlojColePercCon11.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeatureAlojColePercCon11(feature, layer) {
    layer.bindPopup( 'Concelho: ' + '<b> ' + feature.properties.Concelho + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AlojCole11.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeatureAlojColePercCon11,
        mouseout: apagarAlojColePercCon11,
    });
}
var AlojColePercCon11= L.geoJSON(tipoAlojamentoVariacao, {
    style:EstiloAlojColePercCon11,
    onEachFeature: onEachFeatureAlojColePercCon11
});
var LegendaAlojColePercCon11 = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Coletivos em 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slideAlojColePercCon11 = function(){
    var sliderAlojColePercCon11 = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 40){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderAlojColePercCon11, {
        start: [minAlojColePercCon11, maxAlojColePercCon11],
        tooltips:true,
        connect: true,
        range: {
            'min': minAlojColePercCon11,
            'max': maxAlojColePercCon11
        },
        });
    inputNumberMin.setAttribute("value",minAlojColePercCon11);
    inputNumberMax.setAttribute("value",maxAlojColePercCon11);

    inputNumberMin.addEventListener('change', function(){
        sliderAlojColePercCon11.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderAlojColePercCon11.noUiSlider.set([null, this.value]);
    });

    sliderAlojColePercCon11.noUiSlider.on('update',function(e){
        AlojColePercCon11.eachLayer(function(layer){
            if(layer.feature.properties.AlojCole11.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AlojCole11.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderAlojColePercCon11.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 40;
    sliderAtivo = sliderAlojColePercCon11.noUiSlider;
    $(slidersGeral).append(sliderAlojColePercCon11);
} 

///// Fim da Percentagem do Total de Alojamentos Familiares Coletivos em 2011 -------------- \\\\\\


/////// ------------------------- Freguesias --------------------------------- \\\\\\\\\

//////------- Percentagem de Alojamentos Familiares em 2021 POR FREGUESIAS-----////

function CorPercAlojFam21Freg(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minPercAlojFam21Freg = 0;
var maxPercAlojFam21Freg = 0;

function EstiloPercAlojFam21Freg(feature) {
    if( feature.properties.AlojFam21 <= minPercAlojFam21Freg || minPercAlojFam21Freg === 0){
        minPercAlojFam21Freg = feature.properties.AlojFam21
    }
    if(feature.properties.AlojFam21 >= maxPercAlojFam21Freg ){
        maxPercAlojFam21Freg = feature.properties.AlojFam21
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorPercAlojFam21Freg(feature.properties.AlojFam21)
    };
}


function apagarPercAlojFam21Freg(e) {
    PercAlojFam21Freg.resetStyle(e.target)
    e.target.closePopup();

} 
let infoPercAlojFam21Freg = L.control();

infoPercAlojFam21Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPercAlojFam21Freg.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AlojFam21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeaturePercAlojFam21Freg(e) {
    var layer = e.target;
    layer.openPopup();
    infoPercAlojFam21Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeaturePercAlojFam21Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AlojFam21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeaturePercAlojFam21Freg,
        mouseout: apagarPercAlojFam21Freg,
    });
}
var PercAlojFam21Freg= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloPercAlojFam21Freg,
    onEachFeature: onEachFeaturePercAlojFam21Freg
});
var LegendaPercAlojFam21Freg = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares em 2021'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slidePercAlojFam21Freg = function(){
    var sliderPercAlojFam21Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 31){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderPercAlojFam21Freg, {
        start: [minPercAlojFam21Freg, maxPercAlojFam21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minPercAlojFam21Freg,
            'max': maxPercAlojFam21Freg
        },
        });
    inputNumberMin.setAttribute("value",minPercAlojFam21Freg);
    inputNumberMax.setAttribute("value",maxPercAlojFam21Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderPercAlojFam21Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderPercAlojFam21Freg.noUiSlider.set([null, this.value]);
    });

    sliderPercAlojFam21Freg.noUiSlider.on('update',function(e){
        PercAlojFam21Freg.eachLayer(function(layer){
            if(layer.feature.properties.AlojFam21.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AlojFam21.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderPercAlojFam21Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 31;
    sliderAtivo = sliderPercAlojFam21Freg.noUiSlider;
    $(slidersGeral).append(sliderPercAlojFam21Freg);
} 

///// Fim da Percentagem de Alojamentos Familiares em 2021 POR FREGUESIAS -------------- \\\\\\

//////------- Percentagem de Alojamentos Familiares em 2011 POR FREGUESIAS-----////

function CorPercAlojFam11Freg(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minPercAlojFam11Freg = 0;
var maxPercAlojFam11Freg = 0;

function EstiloPercAlojFam11Freg(feature) {
    if( feature.properties.AlojFam11 <= minPercAlojFam11Freg || minPercAlojFam11Freg === 0){
        minPercAlojFam11Freg = feature.properties.AlojFam11
    }
    if(feature.properties.AlojFam11 >= maxPercAlojFam11Freg ){
        maxPercAlojFam11Freg = feature.properties.AlojFam11
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorPercAlojFam11Freg(feature.properties.AlojFam11)
    };
}


function apagarPercAlojFam11Freg(e) {
    PercAlojFam11Freg.resetStyle(e.target)
    e.target.closePopup();

} 
let infoPercAlojFam11Freg = L.control();

infoPercAlojFam11Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPercAlojFam11Freg.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AlojFam11.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeaturePercAlojFam11Freg(e) {
    var layer = e.target;
    layer.openPopup();
    infoPercAlojFam11Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeaturePercAlojFam11Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Taxa de Variação: ' + '<b>' + feature.properties.AlojFam11.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeaturePercAlojFam11Freg,
        mouseout: apagarPercAlojFam11Freg,
    });
}
var PercAlojFam11Freg= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloPercAlojFam11Freg,
    onEachFeature: onEachFeaturePercAlojFam11Freg
});
var LegendaPercAlojFam11Freg = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares em 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slidePercAlojFam11Freg = function(){
    var sliderPercAlojFam11Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 32){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderPercAlojFam11Freg, {
        start: [minPercAlojFam11Freg, maxPercAlojFam11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minPercAlojFam11Freg,
            'max': maxPercAlojFam11Freg
        },
        });
    inputNumberMin.setAttribute("value",minPercAlojFam11Freg);
    inputNumberMax.setAttribute("value",maxPercAlojFam11Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderPercAlojFam11Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderPercAlojFam11Freg.noUiSlider.set([null, this.value]);
    });

    sliderPercAlojFam11Freg.noUiSlider.on('update',function(e){
        PercAlojFam11Freg.eachLayer(function(layer){
            if(layer.feature.properties.AlojFam11.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AlojFam11.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderPercAlojFam11Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 32;
    sliderAtivo = sliderPercAlojFam11Freg.noUiSlider;
    $(slidersGeral).append(sliderPercAlojFam11Freg);
} 

///// Fim da Percentagem de Alojamentos Familiares em 2011 POR FREGUESIAS -------------- \\\\\\

//////------- Percentagem de Alojamentos Familiares Clássicos em 2021 POR FREGUESIAS-----////

function CorPercAlojClass21Freg(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minPercAlojClass21Freg = 0;
var maxPercAlojClass21Freg = 0;

function EstiloPercAlojClass21Freg(feature) {
    if( feature.properties.AloFamCl21 <= minPercAlojClass21Freg || minPercAlojClass21Freg === 0){
        minPercAlojClass21Freg = feature.properties.AloFamCl21
    }
    if(feature.properties.AloFamCl21 >= maxPercAlojClass21Freg ){
        maxPercAlojClass21Freg = feature.properties.AloFamCl21
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorPercAlojClass21Freg(feature.properties.AloFamCl21)
    };
}


function apagarPercAlojClass21Freg(e) {
    PercAlojClass21Freg.resetStyle(e.target)
    e.target.closePopup();

} 
let infoPercAlojClass21Freg = L.control();

infoPercAlojClass21Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPercAlojClass21Freg.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares Clássicos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AloFamCl21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeaturePercAlojClass21Freg(e) {
    var layer = e.target;
    layer.openPopup();
    infoPercAlojClass21Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeaturePercAlojClass21Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Percentagem: ' + '<b>' + feature.properties.AloFamCl21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeaturePercAlojClass21Freg,
        mouseout: apagarPercAlojClass21Freg,
    });
}
var PercAlojClass21Freg= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloPercAlojClass21Freg,
    onEachFeature: onEachFeaturePercAlojClass21Freg
});
var LegendaPercAlojClass21Freg = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares Clássicos em 2021'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slidePercAlojClass21Freg = function(){
    var sliderPercAlojClass21Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 41){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderPercAlojClass21Freg, {
        start: [minPercAlojClass21Freg, maxPercAlojClass21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minPercAlojClass21Freg,
            'max': maxPercAlojClass21Freg
        },
        });
    inputNumberMin.setAttribute("value",minPercAlojClass21Freg);
    inputNumberMax.setAttribute("value",maxPercAlojClass21Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderPercAlojClass21Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderPercAlojClass21Freg.noUiSlider.set([null, this.value]);
    });

    sliderPercAlojClass21Freg.noUiSlider.on('update',function(e){
        PercAlojClass21Freg.eachLayer(function(layer){
            if(layer.feature.properties.AloFamCl21.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AloFamCl21.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderPercAlojClass21Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 41;
    sliderAtivo = sliderPercAlojClass21Freg.noUiSlider;
    $(slidersGeral).append(sliderPercAlojClass21Freg);
} 

///// Fim da Percentagem de Alojamentos Familiares Clássicos em 2021 POR FREGUESIAS -------------- \\\\\\



//////------- Percentagem de Alojamentos Familiares Clássicos em 2011 POR FREGUESIAS-----////

function CorPercAlojClass11Freg(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minPercAlojClass11Freg = 0;
var maxPercAlojClass11Freg = 0;

function EstiloPercAlojClass11Freg(feature) {
    if( feature.properties.AloFamCl11 <= minPercAlojClass11Freg || minPercAlojClass11Freg === 0){
        minPercAlojClass11Freg = feature.properties.AloFamCl11
    }
    if(feature.properties.AloFamCl11 >= maxPercAlojClass11Freg ){
        maxPercAlojClass11Freg = feature.properties.AloFamCl11
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorPercAlojClass11Freg(feature.properties.AloFamCl11)
    };
}


function apagarPercAlojClass11Freg(e) {
    PercAlojClass11Freg.resetStyle(e.target)
    e.target.closePopup();

} 
let infoPercAlojClass11Freg = L.control();

infoPercAlojClass11Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPercAlojClass11Freg.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares Clássicos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AloFamCl11.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeaturePercAlojClass11Freg(e) {
    var layer = e.target;
    layer.openPopup();
    infoPercAlojClass11Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeaturePercAlojClass11Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Percentagem: ' + '<b>' + feature.properties.AloFamCl11.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeaturePercAlojClass11Freg,
        mouseout: apagarPercAlojClass11Freg,
    });
}
var PercAlojClass11Freg= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloPercAlojClass11Freg,
    onEachFeature: onEachFeaturePercAlojClass11Freg
});
var LegendaPercAlojClass11Freg = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares Clássicos em 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slidePercAlojClass11Freg = function(){
    var sliderPercAlojClass11Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 42){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderPercAlojClass11Freg, {
        start: [minPercAlojClass11Freg, maxPercAlojClass11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': minPercAlojClass11Freg,
            'max': maxPercAlojClass11Freg
        },
        });
    inputNumberMin.setAttribute("value",minPercAlojClass11Freg);
    inputNumberMax.setAttribute("value",maxPercAlojClass11Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderPercAlojClass11Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderPercAlojClass11Freg.noUiSlider.set([null, this.value]);
    });

    sliderPercAlojClass11Freg.noUiSlider.on('update',function(e){
        PercAlojClass11Freg.eachLayer(function(layer){
            if(layer.feature.properties.AloFamCl11.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AloFamCl11.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderPercAlojClass11Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 42;
    sliderAtivo = sliderPercAlojClass11Freg.noUiSlider;
    $(slidersGeral).append(sliderPercAlojClass11Freg);
} 

///// Fim da Percentagem de Alojamentos Familiares Clássicos em 2011 POR FREGUESIAS -------------- \\\\\\

//////------- Percentagem de Alojamentos Familiares Não Clássicos em 2021 POR FREGUESIAS-----////

function CorPercAlojNClass21Freg(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minPercAlojNClass21Freg = 0;
var maxPercAlojNClass21Freg = 0;

function EstiloPercAlojNClass21Freg(feature) {
    if( feature.properties.AloFamNC21 <= minPercAlojNClass21Freg || minPercAlojNClass21Freg === 0){
        minPercAlojNClass21Freg = feature.properties.AloFamNC21
    }
    if(feature.properties.AloFamNC21 >= maxPercAlojNClass21Freg ){
        maxPercAlojNClass21Freg = feature.properties.AloFamNC21
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorPercAlojNClass21Freg(feature.properties.AloFamNC21)
    };
}


function apagarPercAlojNClass21Freg(e) {
    PercAlojNClass21Freg.resetStyle(e.target)
    e.target.closePopup();

} 
let infoPercAlojNClass21Freg = L.control();

infoPercAlojNClass21Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPercAlojNClass21Freg.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares Não Clássicos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AloFamNC21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeaturePercAlojNClass21Freg(e) {
    var layer = e.target;
    layer.openPopup();
    infoPercAlojNClass21Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeaturePercAlojNClass21Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Percentagem: ' + '<b>' + feature.properties.AloFamNC21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeaturePercAlojNClass21Freg,
        mouseout: apagarPercAlojNClass21Freg,
    });
}
var PercAlojNClass21Freg= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloPercAlojNClass21Freg,
    onEachFeature: onEachFeaturePercAlojNClass21Freg
});
var LegendaPercAlojNClass21Freg = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares Não Clássicos em 2021'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slidePercAlojNClass21Freg = function(){
    var sliderPercAlojNClass21Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 43){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderPercAlojNClass21Freg, {
        start: [0, maxPercAlojNClass21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': 0,
            'max': maxPercAlojNClass21Freg
        },
        });
    inputNumberMin.setAttribute("value",minPercAlojNClass21Freg);
    inputNumberMax.setAttribute("value",maxPercAlojNClass21Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderPercAlojNClass21Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderPercAlojNClass21Freg.noUiSlider.set([null, this.value]);
    });

    sliderPercAlojNClass21Freg.noUiSlider.on('update',function(e){
        PercAlojNClass21Freg.eachLayer(function(layer){
            if(layer.feature.properties.AloFamNC21.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AloFamNC21.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderPercAlojNClass21Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 43;
    sliderAtivo = sliderPercAlojNClass21Freg.noUiSlider;
    $(slidersGeral).append(sliderPercAlojNClass21Freg);
} 

///// Fim da Percentagem de Alojamentos Familiares Não Clássicos em 2021 POR FREGUESIAS -------------- \\\\\\

//////------- Percentagem de Alojamentos Familiares Não Clássicos em 2011 POR FREGUESIAS-----////

function CorPercAlojNClass11Freg(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minPercAlojNClass11Freg = 0;
var maxPercAlojNClass11Freg = 0;

function EstiloPercAlojNClass11Freg(feature) {
    if( feature.properties.AloFamNC11 <= minPercAlojNClass11Freg || minPercAlojNClass11Freg === 0){
        minPercAlojNClass11Freg = feature.properties.AloFamNC11
    }
    if(feature.properties.AloFamNC11 >= maxPercAlojNClass11Freg ){
        maxPercAlojNClass11Freg = feature.properties.AloFamNC11
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorPercAlojNClass11Freg(feature.properties.AloFamNC11)
    };
}


function apagarPercAlojNClass11Freg(e) {
    PercAlojNClass11Freg.resetStyle(e.target)
    e.target.closePopup();

} 
let infoPercAlojNClass11Freg = L.control();

infoPercAlojNClass11Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPercAlojNClass11Freg.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Familiares Não Clássicos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AloFamNC11.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeaturePercAlojNClass11Freg(e) {
    var layer = e.target;
    layer.openPopup();
    infoPercAlojNClass11Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeaturePercAlojNClass11Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Percentagem: ' + '<b>' + feature.properties.AloFamNC11.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeaturePercAlojNClass11Freg,
        mouseout: apagarPercAlojNClass11Freg,
    });
}
var PercAlojNClass11Freg= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloPercAlojNClass11Freg,
    onEachFeature: onEachFeaturePercAlojNClass11Freg
});
var LegendaPercAlojNClass11Freg = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Familiares Não Clássicos em 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slidePercAlojNClass11Freg = function(){
    var sliderPercAlojNClass11Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 44){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderPercAlojNClass11Freg, {
        start: [0, maxPercAlojNClass11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': 0,
            'max': maxPercAlojNClass11Freg
        },
        });
    inputNumberMin.setAttribute("value",minPercAlojNClass11Freg);
    inputNumberMax.setAttribute("value",maxPercAlojNClass11Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderPercAlojNClass11Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderPercAlojNClass11Freg.noUiSlider.set([null, this.value]);
    });

    sliderPercAlojNClass11Freg.noUiSlider.on('update',function(e){
        PercAlojNClass11Freg.eachLayer(function(layer){
            if(layer.feature.properties.AloFamNC11.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AloFamNC11.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderPercAlojNClass11Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 44;
    sliderAtivo = sliderPercAlojNClass11Freg.noUiSlider;
    $(slidersGeral).append(sliderPercAlojNClass11Freg);
} 

///// Fim da Percentagem de Alojamentos Familiares Não Clássicos em 2011 POR FREGUESIAS -------------- \\\\\\

//////------- Percentagem de Alojamentos Coletivos em 2021 POR FREGUESIAS-----////

function CorPercAlojColet21Freg(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minPercAlojColet21Freg = 0;
var maxPercAlojColet21Freg = 0;

function EstiloPercAlojColet21Freg(feature) {
    if( feature.properties.AlojCole21 <= minPercAlojColet21Freg || minPercAlojColet21Freg === 0){
        minPercAlojColet21Freg = feature.properties.AlojCole21
    }
    if(feature.properties.AlojCole21 >= maxPercAlojColet21Freg ){
        maxPercAlojColet21Freg = feature.properties.AlojCole21
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorPercAlojColet21Freg(feature.properties.AlojCole21)
    };
}


function apagarPercAlojColet21Freg(e) {
    PercAlojColet21Freg.resetStyle(e.target)
    e.target.closePopup();

} 
let infoPercAlojColet21Freg = L.control();

infoPercAlojColet21Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPercAlojColet21Freg.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Coletivos em 2021</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AlojCole21.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeaturePercAlojColet21Freg(e) {
    var layer = e.target;
    layer.openPopup();
    infoPercAlojColet21Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeaturePercAlojColet21Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Percentagem: ' + '<b>' + feature.properties.AlojCole21.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeaturePercAlojColet21Freg,
        mouseout: apagarPercAlojColet21Freg,
    });
}
var PercAlojColet21Freg= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloPercAlojColet21Freg,
    onEachFeature: onEachFeaturePercAlojColet21Freg
});
var LegendaPercAlojColet21Freg = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Coletivos em 2021'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slidePercAlojColet21Freg = function(){
    var sliderPercAlojColet21Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 45){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderPercAlojColet21Freg, {
        start: [0, maxPercAlojColet21Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': 0,
            'max': maxPercAlojColet21Freg
        },
        });
    inputNumberMin.setAttribute("value",minPercAlojColet21Freg);
    inputNumberMax.setAttribute("value",maxPercAlojColet21Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderPercAlojColet21Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderPercAlojColet21Freg.noUiSlider.set([null, this.value]);
    });

    sliderPercAlojColet21Freg.noUiSlider.on('update',function(e){
        PercAlojColet21Freg.eachLayer(function(layer){
            if(layer.feature.properties.AlojCole21.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AlojCole21.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderPercAlojColet21Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 45;
    sliderAtivo = sliderPercAlojColet21Freg.noUiSlider;
    $(slidersGeral).append(sliderPercAlojColet21Freg);
} 

///// Fim da Percentagem de Alojamentos Coletivos em 2021 POR FREGUESIAS -------------- \\\\\\

//////------- Percentagem de Alojamentos Coletivos em 2011 POR FREGUESIAS-----////

function CorPercAlojColet11Freg(d) {
    return d > 20 ? 'rgb(255,82,82)': 
        d > 10 ? 'rgb(255,186,186)' :
        d > 7  ? 'rgb(255,247,192)' :
        d > 3   ? 'rgb(62,123,169)' :
        d >= 0   ? 'rgb(14,89,147)' :
                  '';
    }

var minPercAlojColet11Freg = 0;
var maxPercAlojColet11Freg = 0;

function EstiloPercAlojColet11Freg(feature) {
    if( feature.properties.AlojCole11 <= minPercAlojColet11Freg || minPercAlojColet11Freg === 0){
        minPercAlojColet11Freg = feature.properties.AlojCole11
    }
    if(feature.properties.AlojCole11 >= maxPercAlojColet11Freg ){
        maxPercAlojColet11Freg = feature.properties.AlojCole11
    }
    return {
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.8,
        fillColor: CorPercAlojColet11Freg(feature.properties.AlojCole11)
    };
}


function apagarPercAlojColet11Freg(e) {
    PercAlojColet11Freg.resetStyle(e.target)
    e.target.closePopup();

} 
let infoPercAlojColet11Freg = L.control();

infoPercAlojColet11Freg.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPercAlojColet11Freg.update = function (feature) {
    this._div.innerHTML = '<h4>Percentagem de Alojamentos Coletivos em 2011</h4>' +  (feature ?
    '<b>' 
    + feature.Freguesia + 
    '</b><br />'
    + feature.AlojCole11.toFixed(2)  +
    '% </sup>': '');
};
function highlightFeaturePercAlojColet11Freg(e) {
    var layer = e.target;
    layer.openPopup();
    infoPercAlojColet11Freg.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();}
}
function onEachFeaturePercAlojColet11Freg(feature, layer) {
    layer.bindPopup( 'Freguesia: ' + '<b> ' + feature.properties.Freguesia + '</b>' + ' <br> '  + 'Percentagem: ' + '<b>' + feature.properties.AlojCole11.toFixed(2) + '</b>' + '%').openPopup()
    layer.on({
        click: zoomToFeature,
        mouseover: highlightFeaturePercAlojColet11Freg,
        mouseout: apagarPercAlojColet11Freg,
    });
}
var PercAlojColet11Freg= L.geoJSON(VarTipoAlojamentoFreg, {
    style:EstiloPercAlojColet11Freg,
    onEachFeature: onEachFeaturePercAlojColet11Freg
});
var LegendaPercAlojColet11Freg = function() {
    legendaA.textContent = '';
    legendaA.style.textAlign = 'left';
    legendaA.style.visibility = "visible";
    let symbolsContainer = document.createElement("div");
    symbolsContainer.className = 'symbolsContainer'
    var titulo = 'Percentagem de Alojamentos Coletivos em 2011'

    $(legendaA).append("<div id='legendTitle'>" + titulo +"</div>")

    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,82,82)"></i>' + ' 20 - 38.8' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,186,186)"></i>' + ' 10 - 20' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(255,247,192)"></i>' + ' 7 - 10' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(62,123,169)"></i>' + ' 3 - 7' + '<br>'
    symbolsContainer.innerHTML +=  '<i style="background:rgb(14,89,147)"></i>' + ' 0 - 3' + '<br>'



    $(legendaA).append(symbolsContainer); 
}
let slidePercAlojColet11Freg = function(){
    var sliderPercAlojColet11Freg = document.querySelector('.sliderAtivo');


    if (ifSlide2isActive != 46){
        sliderAtivo.destroy();
    }

    noUiSlider.create(sliderPercAlojColet11Freg, {
        start: [0, maxPercAlojColet11Freg],
        tooltips:true,
        connect: true,
        range: {
            'min': 0,
            'max': maxPercAlojColet11Freg
        },
        });
    inputNumberMin.setAttribute("value",minPercAlojColet11Freg);
    inputNumberMax.setAttribute("value",maxPercAlojColet11Freg);

    inputNumberMin.addEventListener('change', function(){
        sliderPercAlojColet11Freg.noUiSlider.set([this.value, null]);
    });
    inputNumberMax.addEventListener('change', function(){
        sliderPercAlojColet11Freg.noUiSlider.set([null, this.value]);
    });

    sliderPercAlojColet11Freg.noUiSlider.on('update',function(e){
        PercAlojColet11Freg.eachLayer(function(layer){
            if(layer.feature.properties.AlojCole11.toFixed(2)>=parseFloat(e[0])&& layer.feature.properties.AlojCole11.toFixed(2) <= parseFloat(e[1])){
                layer.addTo(map);
            }
            else{
                map.removeLayer(layer);
            }
        })})
        sliderPercAlojColet11Freg.noUiSlider.on('update', function( values, handle ) {
        if (handle==0){
            inputNumberMin.value = values[0];
        } else {
            inputNumberMax.value =  values[1];
        }
    })
    ifSlide2isActive = 46;
    sliderAtivo = sliderPercAlojColet11Freg.noUiSlider;
    $(slidersGeral).append(sliderPercAlojColet11Freg);
} 

///// Fim da Percentagem de Alojamentos Coletivos em 2011 POR FREGUESIAS -------------- \\\\\\







/// Função do zoom\\\\
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}


///painelLegenda.style.visibility ="visible";
var exp = document.querySelector('.ine');
exp.style.visibility = "visible";
exp.innerHTML= '<strong>'+ 'Fonte: ' + '</strong>' + 'Instituto Nacional de Estatística' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+ ' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
legendaA.style.visibility = "visible";
escalasFreguesia.style.visibility = "hidden";


let naoDuplicar = 1
let informacao = infoTotalAlojamentos21;
let layerAtiva = totalAlojamentos21;
let baseAtiva = contorno;
let novaLayer = function(layer, info){

    if(layerAtiva != null){
		map.eachLayer(function(){
			map.removeLayer(layerAtiva);
		});
	}

    if(baseAtiva != null){
		map.eachLayer(function(){
			map.removeLayer(baseAtiva);
		});
	}

    if (informacao !=null){
        map.eachLayer(function(){
            map.removeControl(informacao);
        });
    }
    info.addTo(map);
    informacao = info;
    
    if (layer == totalAlojamentos21 && naoDuplicar != 1){
        legenda('Nº de Alojamentos em 2021',max, (max-min)/2,min,0.1);
        contorno.addTo(map)
        slideTotalAlojamentos21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Instituto Nacional de Estatística' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        baseAtiva = contorno;
        naoDuplicar = 1;
    }
    if (layer == totalAlojamentos21 && naoDuplicar == 1){
        contorno.addTo(map);
    }
    if (layer == totalAlojamentos11Concelhos && naoDuplicar != 6){
        legenda('Nº de Alojamentos em 2011',maxTotalAlojamentos11Concelhos,Math.round((maxTotalAlojamentos11Concelhos-minTotalAlojamentos11Concelhos)/2),minTotalAlojamentos11Concelhos,0.1);
        contorno.addTo(map)
        slidetotalAlojamentos11Concelhos();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'iNE' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 6;
    }
    if (layer == AlojamentosFamiliares2021 && naoDuplicar != 7){
        legenda('Nº de Alojamentos Familiares em 2021',maxAlojaFam2021,Math.round((maxAlojaFam2021-minAlojaFam2021)/2),minAlojaFam2021,0.1);
        contorno.addTo(map);
        slideAlojamentosFamiliares2021();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'iNe' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 7;
    }
    if (layer == AlojamentosFamiliares2011 && naoDuplicar != 8){
        legenda('Nº de Alojamentos Familiares em 2011', maxAlojamentosFamiliares11, Math.round((maxAlojamentosFamiliares11-minAlojamentosFamiliares11)/2),minAlojamentosFamiliares11,0.1);
        contorno.addTo(map)
        slideAlojamentosFamiliares2011();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'INE' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 8;
    }
    if (layer == alojaFamClass2021 && naoDuplicar != 4){
        legenda('Nº de Alojamentos Familiares Clássicos em 2021', maxAlojFamiClass21,Math.round((maxAlojFamiClass21-minAlojFamiClass21)/2),minAlojFamiClass21,0.1);
        contorno.addTo(map)
        slidealojaFamClass2021();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 4;
    }
    if (layer == alojaFamClass2011 && naoDuplicar != 9){
        legenda('Nº de Alojamentos Familiares Clássicos em 2011', maxAlojFamiClass11, Math.round((maxAlojFamiClass11-minAlojFamiClass11)/2),minAlojFamiClass11,0.1);
        contorno.addTo(map);
        slidealojaFamClass2011();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'InE' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 9;
    }
    if (layer == alojaFamNaoClass2021 && naoDuplicar != 18){
        legenda('Nº de Alojamentos Familiares Não Clássicos em 2021', maxAlojFamiNaoClass21, Math.round((maxAlojFamiNaoClass21-minAlojFamiNaoClass21)/2),minAlojFamiNaoClass21,2);
        contorno.addTo(map);
        slidealojaFamNaoClass2021();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'InE' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 18;
    }
    if (layer == alojaFamNaoClass2011 && naoDuplicar != 17){
        legenda('Nº de Alojamentos Familiares Não Clássicos em 2011', maxAlojFamiNaoClass11, Math.round((maxAlojFamiNaoClass11-minAlojFamiNaoClass11)/2),minAlojFamiNaoClass11,2);
        contorno.addTo(map);
        slidealojaFamNaoClass2011();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'InE' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 17;
    }
    if (layer == AlojaFamColetivos21 && naoDuplicar != 5){
        legenda('Nº de Alojamentos Familiares Coletivos em 2021', maxAlojFamiColetivos21, Math.round((maxAlojFamiColetivos21-minAlojFamiColetivos21)/2),minAlojFamiColetivos21,2);
        contorno.addTo(map);
        slideAlojaFamColetivos21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'InE' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 5;
    }
    if (layer == AlojaFamColetivos11 && naoDuplicar != 2){
        legenda('Nº de Alojamentos Familiares Coletivos em 2011', maxAlojFamiColetivos11, Math.round((maxAlojFamiColetivos11-minAlojFamiColetivos11)/2),minAlojFamiColetivos11,2);
        contorno.addTo(map);
        slideAlojaFamColetivos11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'InE' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 2;
    }
    if (layer == totalAlojaFreguesia21 && naoDuplicar != 3){
        legenda('Nº de Alojamentos em 2021', maxTotalAloja21Freg, Math.round((maxTotalAloja21Freg-minTotalAloja21Freg)/2),minTotalAloja21Freg,0.1);
        contornoFreg.addTo(map);
        slidetotalAlojaFreguesia21();
        baseAtiva = contornoFreg;
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 3;
    }
    if (layer == totalAlojaFreguesia11 && naoDuplicar != 10){
        legenda('Nº de Alojamentos  em 2011', maxTotalAloja11Freg, Math.round((maxTotalAloja11Freg-minTotalAloja11Freg)/2),minTotalAloja11Freg,0.1);
        contornoFreg.addTo(map);
        slidetotalAlojaFreguesia11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 10;
    }
    if (layer == AlojaFami21Freg && naoDuplicar != 11){
        legenda('Nº de Alojamentos Familiares  em 2021', maxAlojaFami21Freg, Math.round((maxAlojaFami21Freg-minAlojaFami21Freg)/2),minAlojaFami21Freg,0.1);
        contornoFreg.addTo(map);
        slideAlojaFami21Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 11;
    }
    if (layer == AlojaFami11Freg && naoDuplicar != 12){
        legenda('Nº de Alojamentos Familiares  em 2011', maxAlojaFami11Freg, Math.round((maxAlojaFami11Freg-minAlojaFami11Freg)/2),minAlojaFami11Freg,0.1);
        contornoFreg.addTo(map);
        slideAlojaFami11Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 12;
    }
    if (layer == AlojaFamiClass21Freg && naoDuplicar != 13){
        legenda('Nº de Alojamentos Familiares Clássicos em 2021', maxAlojaFamiClass21Freg, Math.round((maxAlojaFamiClass21Freg-minAlojaFamiClass21Freg)/2),minAlojaFamiClass21Freg,0.1);
        contornoFreg.addTo(map);
        slideAlojaFamiClass21Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 13;
    }
    if (layer == AlojaFamiClass11Freg && naoDuplicar != 14){
        legenda('Nº de Alojamentos Familiares Clássicos em 2011', maxAlojaFamiClass11Freg, Math.round((maxAlojaFamiClass11Freg-minAlojaFamiClass11Freg)/2),minAlojaFamiClass11Freg,0.1);
        contornoFreg.addTo(map);
        slideAlojaFamiClass11Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 14;
    }
    if (layer == AlojaFamiNaoClass21Freg && naoDuplicar != 15){
        legenda('Nº de Alojamentos Familiares Não Clássicos em 2021', maxAlojaFamiNaoClass21Freg, Math.round((maxAlojaFamiNaoClass21Freg-minAlojaFamiNaoClass21Freg)/2),minAlojaFamiNaoClass21Freg,2);
        contornoFreg.addTo(map);
        slideAlojaFamiNaoClass21Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 15;
    }
    if (layer == AlojaFamiNaoClass11Freg && naoDuplicar != 16){
        legenda('Nº de Alojamentos Familiares Não Clássicos em 2011', maxAlojaFamiNaoClass11Freg, Math.round((maxAlojaFamiNaoClass11Freg-minAlojaFamiNaoClass11Freg)/2),minAlojaFamiNaoClass11Freg,2);
        contornoFreg.addTo(map);
        slideAlojaFamiNaoClass11Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 16;
    }
    if (layer == AlojColetivo21Freg && naoDuplicar != 19){
        legenda('Nº de Alojamentos Coletivos em 2021', maxAlojColetivo21Freg, Math.round((maxAlojColetivo21Freg-minAlojColetivo21Freg)/2),minAlojColetivo21Freg,2);
        contornoFreg.addTo(map);
        slideAlojColetivo21Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 19;
    }
    if (layer == AlojColetivo11Freg && naoDuplicar != 20){
        legenda('Nº de Alojamentos Coletivos em 2011', maxAlojColetivo11Freg, Math.round((maxAlojColetivo11Freg-minAlojColetivo11Freg)/2),minAlojColetivo11Freg,2);
        contornoFreg.addTo(map);
        slideAlojColetivo11Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 20;
    }
    if (layer == AlojVarConcelho21_11 && naoDuplicar != 21){
        LegendaAlojVarConcelho21_11();
        slideAlojVarConcelho21_11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 21;
    }
    if (layer == AlojFamiVarConcelho21_11 && naoDuplicar != 22){
        LegendaAlojFamiVarConcelho21_11();
        slideAlojFamiVarConcelho21_11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 22;
    }
    if (layer == AlojFamiClassVarConcelho21_11 && naoDuplicar != 23){
        LegendaAlojFamiClassVarConcelho21_11();
        slideAlojFamiClassVarConcelho21_11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 23;
    }
    if (layer == AlojFamiNaoClassVarConcelho21_11 && naoDuplicar != 24){
        LegendaAlojFamiNaoClassVarConcelho21_11();
        slideAlojFamiNaoClassVarConcelho21_11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 24;
    }
    if (layer == AlojColetivosVarConcelho21_11 && naoDuplicar != 25){
        LegendaAlojColetivosVarConcelho21_11();
        slideAlojColetivosVarConcelho21_11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 25;
    }
    if (layer == AlojVarConcelho11_01 && naoDuplicar != 47){
        LegendaVariacaoConcelhos2021_2011();
        slideAlojVarConcelho11_01();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 47;
    }
    if (layer == AlojFamiVarConcelho11_01 && naoDuplicar != 48){
        LegendaAlojFamiVarConcelhos();
        slideAlojFamiVarConcelho11_01();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 48;
    }
    if (layer == AlojFamiClassVarConcelho11_01 && naoDuplicar != 49){
        LegendaAlojFamiClassVarConcelhos();
        slideAlojFamiClassVarConcelho11_01();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 49;
    }
    if (layer == AlojFamiNaoClassVarConcelho11_01 && naoDuplicar != 50){
        LegendaAlojFamiNaoClassVarConcelhos();
        slideAlojFamiNaoClassVarConcelho11_01();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 50;
    }
    if (layer == AlojColetivosVarConcelho11_01 && naoDuplicar != 51){
        LegendaAlojColetivosVarConcelho11_01();
        slideAlojColetivosVarConcelho11_01();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 51;
    }
    if (layer == VarTotalAlojFreg21 && naoDuplicar != 26){
        LegendaVarTotalAlojFreg21();
        slideVarTotalAlojFreg21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 26;
    }
    if (layer == VarTotalAlojFamiFreg21 && naoDuplicar != 27){
        LegendaVarTotalAlojFamiFreg21();
        slideVarTotalAlojFamiFreg21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 27;
    }
    if (layer == VarTotalAlojFamiClassFreg21 && naoDuplicar != 28){
        LegendaVarTotalAlojFamiClassFreg21();
        slideVarTotalAlojFamiClassFreg21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 28;
    }
    if (layer == VarTotAlojFamNaoClassFreg21 && naoDuplicar != 29){
        LegendaVarTotAlojFamNaoClassFreg21();
        slideVarTotAlojFamNaoClassFreg21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 29;
    }
    if (layer == VarAlojColetivosFreg21 && naoDuplicar != 30){
        LegendaVarAlojColetivosFreg21();
        slideVarAlojColetivosFreg21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 30;
    }
    if (layer == TotAlojFamPercCon21 && naoDuplicar != 33){
        LegendaTotAlojFamPercCon21();
        slideTotAlojFamPercCon21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 33;
    }
    if (layer == TotAlojFamPercCon11 && naoDuplicar != 34){
        LegendaTotAlojFamPercCon11();
        slideTotAlojFamPercCon11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 34;
    }
    if (layer == AlojFamClassPercCon21 && naoDuplicar != 35){
        LegendaAlojFamClassPercCon21();
        slideAlojFamClassPercCon21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 35;
    }
    if (layer == AlojFamClassPercCon11 && naoDuplicar != 36){
        LegendaAlojFamClassPercCon11();
        slideAlojFamClassPercCon11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 36;
    } 
    if (layer == AlojFamNaoClasPercCon21 && naoDuplicar != 37){
        LegendaAlojFamNaoClasPercCon21();
        slideAlojFamNaoClassPercCon21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 37;
    }
    if (layer == AlojFamNaoClasPercCon11 && naoDuplicar != 38){
        LegendaAlojFamNaoClasPercCon11();
        slideAlojFamNaoClasPercCon11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 38;
    } 
    if (layer == AlojColePercCon21 && naoDuplicar != 39){
        LegendaAlojColePercCon21();
        slideAlojColePercCon21();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 39;
    }
    if (layer == AlojColePercCon11 && naoDuplicar != 40){
        LegendaAlojColePercCon11();
        slideAlojColePercCon11();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 40;
    }   
    if (layer == PercAlojFam21Freg && naoDuplicar != 31){
        LegendaPercAlojFam21Freg();
        slidePercAlojFam21Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 31;
    }
    if (layer == PercAlojFam11Freg && naoDuplicar != 32){
        LegendaPercAlojFam11Freg();
        slidePercAlojFam11Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 32;
    }   
    if (layer == PercAlojClass21Freg && naoDuplicar != 41){
        LegendaPercAlojClass21Freg();
        slidePercAlojClass21Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 41;
    }   
    if (layer == PercAlojClass11Freg && naoDuplicar != 42){
        LegendaPercAlojClass11Freg();
        slidePercAlojClass11Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 42;
    } 
    if (layer == PercAlojNClass21Freg && naoDuplicar != 43){
        LegendaPercAlojNClass21Freg();
        slidePercAlojNClass21Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 43;
    }    
    if (layer == PercAlojNClass11Freg && naoDuplicar != 44){
        LegendaPercAlojNClass11Freg();
        slidePercAlojNClass11Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 44;
    }
    if (layer == PercAlojColet21Freg && naoDuplicar != 45){
        LegendaPercAlojColet21Freg();
        slidePercAlojColet21Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 45;
    }    
    if (layer == PercAlojColet11Freg && naoDuplicar != 46){
        LegendaPercAlojColet11Freg();
        slidePercAlojColet11Freg();
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Ine' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        naoDuplicar = 46;
    }     
        
    layer.addTo(map);
    layerAtiva = layer;  
}



let opcaoGrafico = function(){
    mapDIV.style.visibility = "hidden";
    myDIV.style.visibility = "hidden";
    legendaA.style.visibility = "hidden";
    painelLegenda.style.visibility = "hidden";
    tabela.style.visibility = 'hidden';
    filtrar.style.visibility = "hidden";
    slidersGeral.style.visibility = "hidden"
    opcoesTabela.style.visibility = "hidden";
    escalasConcelho.style.visibility = "hidden";
    barraTabela.style.visibility = "hidden";
    escalasFreguesia.style.visibility = "hidden";
    temporal.style.visibility = "hidden"
    grafico.style.visibility = "visible";
    absolutoFreguesia.setAttribute("class", " btn");
    absolutoConcelho.setAttribute("class","btn");
    

}
let opcaoMapa = function(){
    mapDIV.style.visibility = "visible";
    myDIV.style.visibility = "visible";
    painelLegenda.style.visibility = "visible";
    grafico.style.visibility = "hidden";
    tabela.style.visibility = 'hidden';
    opcoesTabela.style.visibility = "hidden";
    barraTabela.style.visibility = "hidden";

    filtrar.style.visibility ="visible";
    escalasConcelho.style.visibility = "visible";   
    legendaA.style.visibility = "visible";
    tiposAlojamento.style.visibility = "visible";

    absolutoConcelho.setAttribute("class"," butao active4");
    variacaoConcelho.setAttribute("class","butao");
    percentagemConcelhos.setAttribute("class","butao");

    slidersGeral.style.visibility = "visible";
    novaLayer(totalAlojamentos21,infoTotalAlojamentos21);
    exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Instituto Nacional de Estatística' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
    temporal.style.visibility = "visible";

}
let opcaoTabela = function(){

    mapDIV.style.visibility = "hidden";
    myDIV.style.visibility = "hidden";
    legendaA.style.visibility = "hidden";
    painel.style.visibility = "hidden";
    painelLegenda.style.visibility = "hidden";
    grafico.style.visibility = "hidden";
    filtrar.style.visibility = "hidden";
    escalasConcelho.style.visibility = "hidden";
    escalasFreguesia.style.visibility = "hidden";
    tabela.style.visibility = 'visible';
    barraTabela.style.visibility = "visible";
    opcoesTabela.style.visibility = "visible";
    slidersGeral.style.visibility = "hidden";
    opcao.setAttribute("class", "butaoEscala active2");
    divFreguesias.setAttribute("class", "butaoEscala");
    DadosAbsolutosTipoAlojamento();

}
let primeirovalor = function(){
    $("#mySelect").val("2021");
    $("#tipoAlojamentoSelect").val("Total")
    $('#mySelect').css('width', 'auto')
    
}
let reporAnos = function(){
    primeirovalor();
    $('#mySelect')[0].options[0].innerHTML = "2021";
    $('#mySelect')[0].options[1].innerHTML = "2011";
}
let reporAnosVariacao = function(){
    primeirovalor();
    $('#mySelect')[0].options[0].innerHTML = "2021 - 2011";
    $('#mySelect')[0].options[1].innerHTML = "2011 - 2001";
}

divFreguesias.addEventListener('click',function(){
    variaveisMapaFreguesias();
    $("#tipoAlojamentoSelect").css('width', '57px')
    reporAnos();
});
opcao.addEventListener('click',function(){
    variaveisMapaConcelho();
    reporAnos();
});
var i = 0
absolutoConcelho.addEventListener('click',function(){
    novaLayer(totalAlojamentos21, infoTotalAlojamentos21);
    $("#tipoAlojamentoSelect option[value='Total']").show();
    $("#tipoAlojamentoSelect").css('width', '57px')
    reporAnos();
});
variacaoConcelho.addEventListener('click', function(){
    novaLayer(AlojVarConcelho21_11,infoAlojVarConcelho21_11);
    $("#tipoAlojamentoSelect option[value='Total']").show();
    $("#tipoAlojamentoSelect").css('width', '57px')
    reporAnosVariacao();
});
percentagemConcelhos.addEventListener('click',function(){
    novaLayer(TotAlojFamPercCon21,infoTotAlojFamPercCon21);
    reporAnos();
    $("#tipoAlojamentoSelect option[value='Total']").hide();
    $("#tipoAlojamentoSelect").val("AF");
    $("#tipoAlojamentoSelect").css('width', '180px')
});

absolutoFreguesia.addEventListener('click',function(){
    novaLayer(totalAlojaFreguesia21, infototalAlojaFreguesia21);
    $("#tipoAlojamentoSelect option[value='Total']").show();
    $("#tipoAlojamentoSelect").css('width', '57px')
    reporAnos();
});
variacaoFreguesia.addEventListener('click',function(){
    novaLayer(VarTotalAlojFreg21, infoVarTotalAlojFreg21);
    $("#tipoAlojamentoSelect option[value='Total']").show();
    $("#tipoAlojamentoSelect").css('width', '57px')
    reporAnosVariacao();
});
percentagemFreguesia.addEventListener('click',function(){
    novaLayer(PercAlojFam21Freg,infoPercAlojFam21Freg);
    reporAnos();
    $("#tipoAlojamentoSelect option[value='Total']").hide();
    $("#tipoAlojamentoSelect").val("AF");
    $("#tipoAlojamentoSelect").css('width', '180px');

});

if($("#mySelect").val == ("2021")){
    i = 0;
}
if($("#mySelect").val == ("2011")){
    i = 1;
}
function myFunction() {
    var tipoAlojamento = document.getElementById("tipoAlojamentoSelect").value;
    var anoSelecionado = document.getElementById("mySelect").value;
    if($(absoluto).hasClass('active4')){
        if (anoSelecionado == "2021" && tipoAlojamento =="Total"){
            novaLayer(totalAlojamentos21,infoTotalAlojamentos21);
        };
        if (anoSelecionado == "2011" && tipoAlojamento =="Total"){
            novaLayer(totalAlojamentos11Concelhos,infoTotalAlojamentos11Concelhos);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AF"){
            novaLayer(AlojamentosFamiliares2021,infoAlojamentosFamiliares2021);
        };
        if (anoSelecionado == "2011" && tipoAlojamento =="AF"){
            novaLayer(AlojamentosFamiliares2011,infoAlojamentosFamiliares2011)
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AFC"){
            novaLayer(alojaFamClass2021,infoalojaFamClass2021)
        };
        if (anoSelecionado == "2011" && tipoAlojamento =="AFC"){
            novaLayer(alojaFamClass2011, infoalojaFamClass2011)
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AFNC"){
            novaLayer(alojaFamNaoClass2021,infoalojaFamNaoClass2021)
        };
        if (anoSelecionado == "2011" && tipoAlojamento == "AFNC"){
            novaLayer(alojaFamNaoClass2011, infoalojaFamNaoClass2011)
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AC"){
            novaLayer(AlojaFamColetivos21,infoAlojaFamColetivos21)
        };
        if (anoSelecionado == "2011" && tipoAlojamento == "AC"){
            novaLayer(AlojaFamColetivos11,infoAlojaFamColetivos11)
        };
    }
    if($(taxaVariacao).hasClass('active4')){
        if (anoSelecionado == "2021" && tipoAlojamento =="Total"){
            novaLayer(AlojVarConcelho21_11,infoAlojVarConcelho21_11);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AF"){
            novaLayer(AlojFamiVarConcelho21_11,infoAlojFamiVarConcelho21_11);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AFC"){
            novaLayer(AlojFamiClassVarConcelho21_11,infoAlojFamiClassVarConcelho21_11);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AFNC"){
            novaLayer(AlojFamiNaoClassVarConcelho21_11,infoAlojFamiNaoClassVarConcelho21_11);
        };  
        if (anoSelecionado == "2021" && tipoAlojamento =="AC"){
            novaLayer(AlojColetivosVarConcelho21_11,infoAlojColetivosVarConcelho21_11);
        };  
        if (anoSelecionado == "2011" && tipoAlojamento =="Total"){
            novaLayer(AlojVarConcelho11_01,infoAlojVarConcelho11_01);
        };
        if (anoSelecionado == "2011" && tipoAlojamento =="AF"){
            novaLayer(AlojFamiVarConcelho11_01,infoAlojFamiVarConcelho11_01);
        };
        if (anoSelecionado == "2011" && tipoAlojamento =="AFC"){
            novaLayer(AlojFamiClassVarConcelho11_01,infoAlojFamiClassVarConcelho11_01);
        };
        if (anoSelecionado == "2011" && tipoAlojamento =="AFNC"){
            novaLayer(AlojFamiNaoClassVarConcelho11_01,infoAlojFamiNaoClassVarConcelho11_01);
        };  
        if (anoSelecionado == "2011" && tipoAlojamento =="AC"){
            novaLayer(AlojColetivosVarConcelho11_01,infoAlojColetivosVarConcelho11_01);
        };     
    }
    if($(percentagem).hasClass('active4')){
        if (anoSelecionado == "2021" && tipoAlojamento == "AF"){
            novaLayer(TotAlojFamPercCon21,infoTotAlojFamPercCon21);
        }
        if (anoSelecionado == "2011" && tipoAlojamento == "AF"){
            novaLayer(TotAlojFamPercCon11,infoTotAlojFamPercCon11);
        }
        if (anoSelecionado == "2021" && tipoAlojamento == "AFC"){
            novaLayer(AlojFamClassPercCon21,infoAlojFamClassPercCon21);
        }
        if (anoSelecionado == "2011" && tipoAlojamento == "AFC"){
            novaLayer(AlojFamClassPercCon11,infoAlojFamClassPercCon11);
        }
        if (anoSelecionado == "2021" && tipoAlojamento == "AFNC"){
            novaLayer(AlojFamNaoClasPercCon21,infoAlojFamNaoClasPercCon21);
        }
        if (anoSelecionado == "2011" && tipoAlojamento == "AFNC"){
            novaLayer(AlojFamNaoClasPercCon11,infoAlojFamNaoClasPercCon11);
        }
        if (anoSelecionado == "2021" && tipoAlojamento == "AC"){
            novaLayer(AlojColePercCon21,infoAlojColePercCon21);
        }
        if (anoSelecionado == "2011" && tipoAlojamento == "AC"){
            novaLayer(AlojColePercCon11,infoAlojColePercCon11);
        }
        
    }
    if($(absolutoFreguesia).hasClass('active5')){
        if (anoSelecionado == "2021" && tipoAlojamento == "Total"){
            novaLayer(totalAlojaFreguesia21, infototalAlojaFreguesia21);
        };
        if (anoSelecionado == "2011" && tipoAlojamento == "Total"){
            novaLayer(totalAlojaFreguesia11, infototalAlojaFreguesia11);
        };
        if (anoSelecionado == "2021" && tipoAlojamento == "AF"){
            novaLayer(AlojaFami21Freg, infoAlojaFami21Freg);
        };
        if (anoSelecionado == "2011" && tipoAlojamento == "AF"){
            novaLayer(AlojaFami11Freg, infoAlojaFami11Freg);
        };
        if (anoSelecionado == "2021" && tipoAlojamento == "AFC"){
            novaLayer(AlojaFamiClass21Freg, infoAlojaFamiClass21Freg);
        };
        if (anoSelecionado == "2011" && tipoAlojamento == "AFC"){
            novaLayer(AlojaFamiClass11Freg,infoAlojaFamiClass11Freg);
        };
        if (anoSelecionado == "2021" && tipoAlojamento == "AFNC"){
            novaLayer(AlojaFamiNaoClass21Freg,infoAlojaFamiNaoClass21Freg);
        };
        if (anoSelecionado == "2011" && tipoAlojamento == "AFNC"){
            novaLayer(AlojaFamiNaoClass11Freg,infoAlojaFamiNaoClass11Freg);
        }; 
        if (anoSelecionado == "2021" && tipoAlojamento == "AC"){
            novaLayer(AlojColetivo21Freg,infoAlojColetivo21Freg);
        };
        if (anoSelecionado == "2011" && tipoAlojamento == "AC"){
            novaLayer(AlojColetivo11Freg,infoAlojColetivo11Freg);
        };       
    }
    if($(taxaVariacaoFreguesia).hasClass('active5')){
        if (anoSelecionado == "2021" && tipoAlojamento =="Total"){
            novaLayer(VarTotalAlojFreg21,infoVarTotalAlojFreg21);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AF"){
            novaLayer(VarTotalAlojFamiFreg21,infoVarTotalAlojFamiFreg21);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AFC"){
            novaLayer(VarTotalAlojFamiClassFreg21,infoVarTotalAlojFamiClassFreg21);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AFNC"){
            novaLayer(VarTotAlojFamNaoClassFreg21,infoVarTotAlojFamNaoClassFreg21);
        };  
        if (anoSelecionado == "2021" && tipoAlojamento =="AC"){
            novaLayer(VarAlojColetivosFreg21,infoVarAlojColetivosFreg21);
        };  
        ////FALTAM OS DADOS DE 2011
    }
    if($(percentagemFreguesia).hasClass('active5')){
        if (anoSelecionado == "2021" && tipoAlojamento =="AF"){
            novaLayer(PercAlojFam21Freg,infoPercAlojFam21Freg);
        };
        if (anoSelecionado == "2011" && tipoAlojamento =="AF"){
            novaLayer(PercAlojFam11Freg,infoPercAlojFam11Freg);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AFC"){
            novaLayer(PercAlojClass21Freg,infoPercAlojClass21Freg);
        };
        if (anoSelecionado == "2011" && tipoAlojamento =="AFC"){
            novaLayer(PercAlojClass11Freg,infoPercAlojClass11Freg);
        };
        if (anoSelecionado == "2021" && tipoAlojamento =="AFNC"){
            novaLayer(PercAlojNClass21Freg,infoPercAlojNClass21Freg);
        }; 
        if (anoSelecionado == "2011" && tipoAlojamento =="AFNC"){
            novaLayer(PercAlojNClass11Freg,infoPercAlojNClass11Freg);
        };   
        if (anoSelecionado == "2021" && tipoAlojamento =="AC"){
            novaLayer(PercAlojColet21Freg,infoPercAlojColet21Freg);
        }; 
        if (anoSelecionado == "2011" && tipoAlojamento =="AC"){
            novaLayer(PercAlojColet11Freg,infoPercAlojColet11Freg);
        };   
        
    }

    
}
//$("#mySelect option[value='2001']").remove();
//$("#mySelect option[value='1991']").remove();

var DadosAbsolutosTipoAlojamento = function(){
    $(document).ready(function(){
        $.getJSON("https://raw.githubusercontent.com/diogoomb/waza/main/TipodeAlojamento.json", function(data){
            $('#juntarValores').empty();
            console.log(data)
            var dados = '';
            esconderano2001.innerText = '2001'
            $.each(data, function(key, value){
                dados += '<tr>';
                if(value.TipoAlojamento == "Alojamentos Coletivos"){
                    dados += '<td>'+value.Concelho+'</td>';
                    dados += '<td class="borderbottom">'+value.Freguesia+'</td>';
                    dados += '<td class="borderbottom">'+value.TipoAlojamento+'</td>';
                    dados += '<td class="borderbottom">'+value.SubCategoria+'</td>';
                    dados += '<td class="borderbottom">'+value.D2001+'</td>';
                    dados += '<td class="borderbottom">'+value.D2011+'</td>';
                    dados += '<td class="borderbottom">'+value.D2021+'</td>';
                }
                else{
                    dados += '<td>'+value.Concelho+'</td>';
                    dados += '<td>'+value.Freguesia+'</td>';
                    dados += '<td>'+value.TipoAlojamento+'</td>';
                    dados += '<td>'+value.SubCategoria+'</td>';
                    dados += '<td>'+value.D2001+'</td>';
                    dados += '<td>'+value.D2011+'</td>';
                    dados += '<td>'+value.D2021+'</td>';
                    dados += '<tr>';
                }
                dados += '<tr>';
            })
        $('#juntarValores').append(dados);   
        exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Instituto Nacional de Estatística' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
    });
})};


tabelaTipoAlojamentoDadosAbsolutos.addEventListener('click', function(){
    DadosAbsolutosTipoAlojamento();;   
    });


tabelaVariacao.addEventListener('click', function(){
    $(document).ready(function(){
        $.getJSON("https://raw.githubusercontent.com/diogoomb/waza/main/TipodeAlojamento.json", function(data){
            $('#juntarValores').empty();
            var dados = '';
            esconderano2001.innerText = ' '
            $.each(data, function(key, value){
                dados += '<tr>';
                if(value.TipoAlojamento == "Alojamentos Coletivos"){
                    dados += '<td>'+value.Concelho+'</td>';
                    dados += '<td class="borderbottom">'+value.Freguesia+'</td>';
                    dados += '<td class="borderbottom">'+value.TipoAlojamento+'</td>';
                    dados += '<td class="borderbottom">'+value.SubCategoria+'</td>';
                    dados += '<td class="borderbottom">'+ ' '+'</td>';
                    dados += '<td class="borderbottom">'+value.VAR1101+'</td>';
                    dados += '<td class="borderbottom">'+value.VAR2111+'</td>';
                }
                else{
                    dados += '<td>'+value.Concelho+'</td>';
                    dados += '<td>'+value.Freguesia+'</td>';
                    dados += '<td>'+value.TipoAlojamento+'</td>';
                    dados += '<td>'+value.SubCategoria+'</td>';
                    dados += '<td>'+ ' '+'</td>';
                    dados += '<td>'+value.VAR1101+'</td>';
                    dados += '<td>'+value.VAR2111+'</td>';
                    dados += '<tr>';
                }
                dados += '<tr>';
            })
                exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'INE (Cálculos próprios)' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        $('#juntarValores').append(dados); 
    });
    });
});
tabelaPercentagem.addEventListener('click', function(){
    $(document).ready(function(){
        $.getJSON("https://raw.githubusercontent.com/diogoomb/waza/main/TipodeAlojamento.json", function(data){
            $('#juntarValores').empty();
            var dados = '';
            esconderano2001.innerText = '2001'
            $.each(data, function(key, value){
                dados += '<tr>';
                if(value.TipoAlojamento == "Alojamentos Coletivos"){
                dados += '<td>'+value.Concelho+'</td>';
                dados += '<td class="borderbottom">'+value.Freguesia+'</td>';
                dados += '<td class="borderbottom">'+value.TipoAlojamento+'</td>';
                dados += '<td class="borderbottom">'+value.SubCategoria+'</td>';
                dados += '<td class="borderbottom">'+value.PER2001+'</td>';
                dados += '<td class="borderbottom">'+value.PER2011+'</td>';
                dados += '<td class="borderbottom">'+value.PER2021+'</td>';
                }
                else{
                    dados += '<td>'+value.Concelho+'</td>';
                    dados += '<td>'+value.Freguesia+'</td>';
                    dados += '<td>'+value.TipoAlojamento+'</td>';
                    dados += '<td>'+value.SubCategoria+'</td>';
                    dados += '<td>'+value.PER2001+'</td>';
                    dados += '<td>'+value.PER2011+'</td>';
                    dados += '<td>'+value.PER2021+'</td>';
                }
                dados += '<tr>';
                })
                exp.innerHTML = '<strong>'+ 'Fonte: ' + '</strong>' + 'Instituto Nacional de Estatística' + "<a href='https://www.ine.pt/bddXplorer/htdocs/minfo.jsp?var_cd=0011187&lingua=PT'>"+' ' + '<img src="../imagens/seta2.svg" width="10px" height="20px"></a>';
        $('#juntarValores').append(dados); 
    });
    });
});
absolutoFreguesia.setAttribute("class", "btn");
let variaveisMapaConcelho = function(){
    escalasConcelho.style.visibility = "visible";
    escalasFreguesia.style.visibility = "hidden";
    absolutoFreguesia.setAttribute("class", " btn");
    ///$("#mySelect option[value='2001']").remove();
    //$("#mySelect option[value='1991']").remove();
    if($(absoluto).hasClass('active4')){
        return false;
    }
    else{
        opcao.setAttribute("class", " btn active2")
        absoluto.setAttribute("class", " butao active4");
        variacaoConcelho.setAttribute("class","  butao");
        percentagemConcelhos.setAttribute("class"," butao");
        novaLayer(totalAlojamentos21, infoTotalAlojamentos21);
        $("#mySelect").val("2021");

    }

}


let variaveisMapaFreguesias = function(){
    escalasConcelho.style.visibility = "hidden";
    escalasFreguesia.style.visibility = "visible";
    if($(absolutoFreguesia).hasClass('active5')){
        return false;
    }
    else{
        absolutoFreguesia.setAttribute("class", "butao active5");
        variacaoFreguesia.setAttribute("class","butao");
        percentagemFreguesia.setAttribute("class","butao");
        ////Preciso de colocar este absoluto como active5, para que mude para a escala concelho
        absoluto.setAttribute("class","btn");
        novaLayer(totalAlojaFreguesia21, infototalAlojaFreguesia21);
        $("#mySelect").val("2021");
        //$('#mySelect').append("<option value='2001'>2001</option>")
        //$('#mySelect').append("<option value='1991'>1991</option>")
}
}

// function Next() {
//     var index;
//     var selecionarAnos = document.getElementById("mySelect");
//     var options = selecionarAnos.getElementsByTagName("option")
//     for (var i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//             console.log(options[i]);
//             index = i;
//             myFunction();
            
//         }
//     }
//     console.log(index);
//     index = index +1;
//     console.log(index);
//     if (index >= selecionarAnos.length) {
//         alert('Last record reached')
//     }
//     else {               
//         console.log(selecionarAnos.value)
//         selecionarAnos.value = selecionarAnos[index].value;
//     }

// }
// function Previous() {
//     var index;
//     var selecionarAnos = document.getElementById("mySelect");
//     var options = selecionarAnos.getElementsByTagName("option")
//     for (var i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//             index = i;
//             myFunction();
//         }
//     }
//     index = index - 1;

//     if (index <= -1) {
//         alert('First record reached')
//     }
//     else {               
//         selecionarAnos.value = selecionarAnos[index].value;
//     }
// } 

const opcoesAnos = $('#mySelect');      
function next(){
    if (i === 0) {
        i = 1
        opcoesAnos.find('option:selected').next().prop('selected', true);
        myFunction();
        console.log(i)
    }
    if(i === 1){
            return false
    }
}
function prev(){
    if (i === 1) {
        i = 0
        opcoesAnos.find('option:selected').prev().prop('selected', true);
        myFunction();
        console.log(i)
    }
    if(i === 0){
        return false
}
}
$("#btnNext").click(function(e){ 
    e.preventDefault(); 
     }); 
$("#btnPrev").click(function(e){ 
    e.preventDefault(); 
     }); 


const alterarTamanho = document.querySelector('select')

alterarTamanho.addEventListener('change', (event) => {
    let tempSelect = document.createElement('select'),
    tempOption = document.createElement('option');
     
    tempOption.textContent = event.target.options[event.target.selectedIndex].text;
    tempSelect.style.cssText += `
            visibility: hidden;
           position: fixed;
           `;
    tempSelect.appendChild(tempOption);
    event.target.after(tempSelect);
       
    const tempSelectWidth = tempSelect.getBoundingClientRect().width;
    event.target.style.width = `${tempSelectWidth +5}px`;
    tempSelect.remove();
});
     
alterarTamanho.dispatchEvent(new Event('change'));

// var values = ["Total", "Alojamentos Familiares", "Alojamentos Familiares não clássicos", "Alojamentos Coletivos"];
     
// var select = document.createElement("select");
// select.name = "selectTipoAlojamento";
// select.id = "selectTA"

     
// for (const val of values){
//     var option = document.createElement("option");
//     option.value = val;
//     option.text = val.charAt(0).toUpperCase() + val.slice(1);
//     select.appendChild(option);
// }
// var label = document.getElementById("titulo1");
// label.innerHTML = "Tipo de Alojamento: "
// document.getElementById("example-select").appendChild(label).appendChild(select);



/*
var Arouca = {
    label: "Arouca",
    data: [26378, 23896,24227,22359,21154],
    tension:0.3,
    fill: false,
    borderColor: 'red'
};
var Espinho={
    label: "Espinho",
    data: [23084, 32409,33701,31786,31027],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Gondomar={
    label: "Gondomar",
    data: [84599, 130751,164096,168027,164255],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Maia={
    label: "Maia",
    data: [53643, 81679,120111,135306,134959],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Matosinhos={
    label: "Matosinhos",
    data: [91017, 136498,167026,175478,172669],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Oliveira={
    label: "Oliveira de Azeméis",
    data: [46263, 62821,70721,68611,66190],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Paredes={
    label: "Paredes",
    data: [43388, 67693,83376,86854,84414],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Porto={    
    label: "Porto",
    data: [303424, 327368,263131,237591,231962],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Povoa={    
    label: "Póvoa de Varzim",
    data: [40444, 54248,63470,63408,64320],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Santa={    
    label: "Santa Maria da Feira",
    data: [83483, 109531,135964,139312,136720],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var SantoTirso={    
    label: "Santo Tirso",
    data: [77130, 93482,72396,71530,67785],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var SJM={    
    label: "São João da Madeira",
    data: [11921, 16444,21102,21713,22162],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Trofa={    
    label: "Trofa",
    data: [0, 0,37581,38999,38612],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Vale={    
    label: "Vale de Cambra",
    data: [20404, 24224,24798,22864,21279],
    tension:0.3,
    fill: false,
    borderColor: 'green'
}
var Valongo={    
    label: "Valongo",
    data: [33300, 64234,86005,93858,94795],
    tension:0.3,
    fill: false,
    borderColor: 'red'
}
var Vila={    
    label: "Vila do Conde",
    data: [48806, 64402,74391,79533,80921],
    tension:0.3,
    fill: false,
    borderColor: 'yellow',
}
var Gaia={    
    label:"Vila Nova de Gaia",
    data: [157357, 226331,288749,302295,304149],
    tension:0.3,
    fill: false,
    borderColor: 'rgb(23,102,233)', 
}

// tipo de ponto    pointStyle: 'triangle'
// tamanho do ponto    pointBorderWidth:10
// cor da borda dos pontos    pointBorderColor: 'rgb(134,75,89)'
// espessura da linha    borderWidth: 10
// preencher a cor do retangulo dentro da legenda assim como os pontos    backgroundColor: 'rgb(230,5,123)'
///}
var Anos = {
    labels: ["1960", "1981", "2001", "2011", "2021"],
    datasets: [Arouca, Espinho,Gondomar,Maia,Matosinhos,Oliveira, Paredes, Porto,Povoa, Santa, SantoTirso, SJM, Trofa, Vale, Valongo, Vila, Gaia]
};
  
const ctx = document.getElementById('grafico').getContext('2d');

var chartOptions = {
    responsive:false,
    plugins:{
        legend: {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 10,
                boxHeight:3,
                color: 'orange'
            },
        },
    },

}
  
var lineChart = new Chart(ctx, {
    type: 'line',
    data: Anos,
    options: chartOptions,
    
  }); */


// ///// ------ Gráfico Atual -------\\\\\
//   am4core.ready(function() {

// // // // Themes begin
//   am4core.useTheme(am4themes_animated);
// // // // Themes end

//   var chart = am4core.create("grafico", am4plugins_forceDirected.ForceDirectedTree);
//   chart.language.locale["_thousandSeparator"] = "."; 

//   var graficoPopResi = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())


//   graficoPopResi.dataSource.url ="https://raw.githubusercontent.com/diogoomb/waza/main/string-to-json-online%20(1).json"
//   graficoPopResi.colors.list = [
//       am4core.color("#ffd700"),
//      am4core.color("#ffb00b"),
//      am4core.color("#55aacc"),
//      am4core.color("#5566cc"),
//       am4core.color("#0e2763"),
//       am4core.color("#76d75b"),
//     am4core.color("#5fb565"),
//      am4core.color("#175f3b"),
//   am4core.color("#ff0000"),
//     am4core.color("#ff6666"),
//       am4core.color("#800000"),
//             am4core.color("#696969"),
//     am4core.color("#cbbeb5"),
//       am4core.color("#101010"),
//       am4core.color("#6e1243"),
//       am4core.color("#a89f4d"),
//     am4core.color("#e1c981"),
//  ];

//   graficoPopResi.dataFields.name = "name";
//   graficoPopResi.dataFields.id = "name";
//   graficoPopResi.dataFields.value = "value";
//   graficoPopResi.dataFields.children = "children";
//   graficoPopResi.dataFields.color = "color";
//   graficoPopResi.dataFields.collapsed = false;



//  graficoPopResi.nodes.template.tooltipText = "[bold]{name}: [/]" + "{value}" + " Residentes";
//  graficoPopResi.nodes.template.label.text = "{name}"; 
//  graficoPopResi.nodes.template.label.hideOversized = true;
//  graficoPopResi.nodes.template.label.truncate = true;

//  graficoPopResi.nodes.template.fillOpacity = 0.85;
//  graficoPopResi.nodes.template.outerCircle.fillOpacity = 0;

//  graficoPopResi.links.template.strokeOpacity = 0;

//  graficoPopResi.links.template.distance = 1;
//  graficoPopResi.fontSize = 10;
//  graficoPopResi.manyBodyStrength = -4;

//  graficoPopResi.minRadius = am4core.percent(2);

//  graficoPopResi.events.on("inited", function() {
//      graficoPopResi.animate({
//        property: "velocityDecay",
//        to: 0.8
//       }, 1000);
//     });
//   });  

/////-------------------------------\\\
/////----- OUTRO TIPO DE GRÁFICO -------\\\\\

/* 

 var chartDom = document.getElementById('grafico');
 var myChart = echarts.init(chartDom);
 var option;
 
 option = {
   title: {
     text: 'Gráfico Linhas'
   },
   tooltip: {
     trigger: 'axis',
   },
   legend: {
     data: ['Arouca', 'Espinho', 'Gondomar', 'Maia', 'Matosinhos']
   },
   grid: {
     left: '3%',
     right: '4%',
     bottom: '3%',
     containLabel: true
   },
   xAxis: {
     type: 'category',
     boundaryGap: false,
     data: ['1991', '2001', '2011', '2021']
   },
   yAxis: {
     type: 'value'
   },
   series: [
     {
       name: 'Arouca',
       type: 'line',
       stack: 'Total',
       data: [45000, 47000, 25000, 22500],
       smooth:true
     },
     {
       name: 'Espinho',
       type: 'line',
       stack: 'Total',
       smooth:true,
       data: [50000, 51000,50000,50500]
     },
     {
       name: 'Gondomar',
       type: 'line',
       stack: 'Total',
       smooth:true,
       data: [65000, 70000, 80000, 90000]
     },
     {
       name: 'Maia',
       type: 'line',
       stack: 'Total',
       smooth:true,
       data: [54250, 56875, 56987, 60257]
     },
     {
       name: 'Matosinhos',
       type: 'line',
       stack: 'Total',
       smooth:true,
       data: [100000, 100932, 110000, 115000]
     }
   ]
 };
 
option && myChart.setOption(option);  */
///-----------------------------\\\ 
/* 
 Highcharts.chart('grafico', {
    chart: {
        type: 'packedbubble',
        height: '74%'
    },
    title: {
        text: 'População Residente na AMP (2021)'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b>{point.value} Residentes'
    },
    plotOptions: {
        packedbubble: {
            minSize: '20%',
            maxSize: '200%',
            zMin: 0,
            zMax: 55000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02,
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 49500,
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: seriesOptions
    })
    function success(data) {
    var name = this.url.match(/(msft|aapl|goog)/)[0].toUpperCase();
    var i = names.indexOf(name);
    seriesOptions[i] = {
        name: name,
        data: data
    };

    // As we're loading the data asynchronously, we don't know what order it
    // will arrive. So we keep a counter and create the chart when all the data is loaded.
    seriesCounter += 1;

    if (seriesCounter === names.length) {
        createChart();
    }
} 


 */
// set the dimensions and margins of the graph
const width = 900
const height = 444

// append the svg object to the body of the page
const svg = 
    d3.select("#divGrafico")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    

// Read data
d3.csv("https://raw.githubusercontent.com/diogoomb/waza/main/GraficoPopulacao2021.csv").then( function(data) {
    data.sort(function(a, b){
        return b["value"]-a["value"];
     })


  const color = d3.scaleOrdinal()
    .domain(["Arouca", "Espinho", "Gondomar", "Maia", "Matosinhos", "Oliveira de Azeméis", "Paredes", "Porto", "Póvoa de Varzim", "Santa Maria da Feira", "Santo Tirso", "São João da Madeira", "Trofa", "Vale de Cambra", "Valongo", "Vila do Conde", "Vila Nova de Gaia"])
    .range(["#B8255F","#DB4035","#FF9933","#FAD000","#AFB83B","#7ECC49","#299438","#96C3EB","#4073FF","#14AAF5","#884DFF","#AF38EB","#EB96EB","#808080","#B8B8B8","#003333","#FF8D85"]);

  // Size scale for countries
  const size = d3.scaleLinear()
    .domain([0, 190000])
    .range([7,80])  // circle will be between 7 and 55 px wide
    

  const graficoTitulo = d3.select("#divGrafico")
    .append("div")
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position","absolute")
    .style("top","20%")
    .style("right","20px")
    .style("font-weight","bolder")
    .text('População Residente em 2021, por freguesia')

  // create a tooltip
  const Tooltip = d3.select("#divGrafico")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("position","absolute")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "7px")
    .style("line-height", "24px")
  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event, d) {
    Tooltip
    .style("opacity", 1)
    .style("pointer-events", "none")
    d3.select(this)
    .style("opacity", 1)
    .style("stroke", "black")
    .style("stroke-width", "3")
    .style("cursor", "pointer")
    .transition()
    .duration(200)
  }
  const mousemove = function(event, d) {
    Tooltip
      .html('<b>' + d.key + '</b>' + "<br>"
      + d.value + " Residentes" + "<br>"
      + "Concelho: " + d.subregion + "<br>")
      .style("left", (event.x/2+20) + "px")
      .style("top", (event.y/2-30) + "px")
  }
  var mouseleave = function(event, d) {
    Tooltip
    .style("opacity", 0)
    d3.select(this)
    .transition()
    .duration(200)
    .style("stroke", "transparent")
  }

  // Initialize the circle: all located at the center of the svg area
  var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.value))
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", d => color(d.subregion))
      .style("fill-opacity", 1)
    //   .attr("stroke", "black") --- Formato Original, com stroke à volta dos círculos
    //   .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));


  // Features of the forces applied to the nodes:
    const simulation = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
        .nodes(data)
        .on("tick", function(d){
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
        });

    // What happens when a circle is dragged?
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(.03).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
    }
    // var wrap = svg.selectAll('.legend').append('g').data(color.domain());
    // var gEnter = wrap.enter().append('g').attr('class', 'legend')
    //     .append('g');
    // var legend = wrap.select('g').style("width",500)
    //     .attr("transform", function(d, i) { return "translate(" + i * 80 + ",0)"; });
    const nomesLegenda = d3.scaleOrdinal()
    .domain(["Arouca", "Espinho", "Gondomar", "Maia", "Matosinhos", "O.Azeméis", "Paredes", "Porto", "P.Varzim", "S.M.Feira", "Santo Tirso", "S.J.Madeira", "Trofa", "V.Cambra", "Valongo", "Vila do Conde", "V.N.G"])
    .range(["#B8255F","#DB4035","#FF9933","#FAD000","#AFB83B","#7ECC49","#299438","#96C3EB","#4073FF","#14AAF5","#884DFF","#AF38EB","#EB96EB","#808080","#B8B8B8","#003333","#FF8D85"]);
    const svg1 = 
        d3.select("#divLegenda")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "49px")
    var legend = svg1
        .selectAll('.legend')
        .data(nomesLegenda.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr("transform", position);

    // draw legend colored circles
    legend.append("circle")
        .style("fill", nomesLegenda)
        .style('stroke', nomesLegenda)
        .attr('r', 5)
        .attr('transform', 'translate(0,20)');

    // // draw legend text
    legend.append("text")
        .attr("dy", ".35em")
        .attr("dx", ".35em")
        .attr('transform', 'translate(10,20)')
        .text(function(d) { return d;})
    
        function position(d,i) {
            var c = 8.5;
            var r = Math.ceil(17 / c);
            var h = 20;  // height of each entry
            var w = 125; // width of each entry (so you can position the next column)
            var tx = 20; // tx/ty are essentially margin values
            var ty = 0;
            var x = Math.floor(i / r) * w + tx;
            var y = i % r * h + ty;
            return "translate(" + x + "," + y + ")";
          }
})