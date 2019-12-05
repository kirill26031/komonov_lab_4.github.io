import './scss/main.scss';
import $ from "jquery";


window.onload = function () {
  scroll_settings();
  cart_init();
  show_category("all");
  $('.menu_categories').on('click', function (event) {
    $(".categories").toggleClass('show_categories');
  });
  $('.main').on('click', function (event) {
    current_category='all';
    show_category('all');
  });
  $('.memes').on('click', function (event) {
    current_category=7;
    show_category('7');
  });
  $('#categories_close').on('click', function (event) {
    $(".categories").removeClass('show_categories');
  });
  read_categories();
  document.addEventListener('keydown', function(e){
    if($('#item11.item, #item11.item_full')[0]!=undefined && $('.submit_popup')[0].style.display!='flex'){
    if(e.code=='KeyF') $('.content_space #item11 img')[0].src='https://bit.ly/2qJePOV';
    }
  });
}

// Start of old code 
function scroll_settings() {
  var header_hidden = 0;

  window.addEventListener('scroll', function () {
    var header_top = document.getElementsByClassName('header_top')[0];
    let old_height = parseInt($('.header').css('height'));
    if (this.pageYOffset > 50 && header_hidden == 0) {
      header_top.classList.add("scroll");
      header_hidden = 1;
    }
    else if (this.pageYOffset <= 50 && header_hidden == 1) {
      header_top.classList.remove("scroll");
      header_hidden = 0;
    }
    let diff_height = parseInt($('.header').css('height')) - old_height;
    $('.categories_list')[0].style.marginTop =
      parseInt($('.categories_list').css('margin-top')) + diff_height + "px";
  });
}

var header_menu_btn = document.querySelector('.menu_icon');
var menu = document.querySelector('.menu');
var middle_wrapper = $(".middle_wrapper");
header_menu_btn.addEventListener('click', function () {
  let header_buttons = $(".header_buttons");

  let dif_height = 0;
  if (menu.style.display == '') {
    let old_height = parseInt(header_buttons.css('height'));
    menu.style.display = 'flex';
    dif_height = parseInt(header_buttons.css('height')) - old_height;
  }
  else {
    let old_height = parseInt(header_buttons.css('height'));
    menu.style.display = '';
    dif_height = parseInt(header_buttons.css('height')) - old_height;
  }
  middle_wrapper[0].style.paddingTop = (parseInt(parseInt(middle_wrapper.css('padding-top')) + dif_height) + "px");
});

function cart_init() {
  var popup_back = document.querySelector('.popup_back');
  var cart_counter_block = document.querySelector('.cart_counter');
  var cart_icon = document.querySelector('.header_cart');
  cart_icon.onclick = function () {
    popup_back.style.display = "flex";
  };
  var cart_close = document.querySelector('#cart_close');
  cart_close.onclick = function () {
    popup_back.style.display = "none";
  };
  $('.submit_cart').on('click', function(e){
    $('.popup_cart')[0].style.display="none";
    $('.submit_popup')[0].style.display="flex";
    $('#submit_forms_btn')[0].style.display="block";
    $('.message_place').empty();
  });
  $('#submit_close').on('click', (e)=>{
    $('.popup_cart')[0].style.display="flex";
    $('.submit_popup')[0].style.display="none";
  });
  $('#submit_forms_btn').on('click', (e)=>{
    send_cart();
  });
}
function add_row_to_cart(id) {
  $('.cart_counter_number')[0].innerText = (parseInt($('.cart_counter_number')[0].innerText) + 1);
  $('.submit_cart')[0].style.display='block';
  $('.popup_cart .cart_empty')[0].style.display = "none";
  let curr_elem = items_list.get(id);
  let result = '<div class="cart_row" id="item' + id + '">' +
    '<div class="row_close_block">' +
    '<svg class="row_close" viewBox="0 0 37 37" xmlns="http://www.w3.org/2000/svg">' +
    '<path fill-rule="evenodd" clip-rule="evenodd"' +
    'd="M0 18.5C0 8.283 8.283 0 18.5 0S37 8.283 37 18.5C37 28.718 28.717 37 18.5 37S0 28.719 0 18.5z">' +
    '</path>' +
    '<path fill-rule="evenodd" clip-rule="evenodd"' +
    'd="M20.913 18.5l5.227-5.227a1.707 1.707 0 0 0-2.411-2.413l-5.23 5.227-5.227-5.227a1.705 1.705 0 1 0-2.411 2.413l5.227 5.228-5.227 5.227a1.704 1.704 0 0 0 1.206 2.913 1.7 1.7 0 0 0 1.205-.5l5.228-5.227 5.229 5.227c.333.333.768.5 1.205.5a1.707 1.707 0 0 0 1.207-2.913l-5.228-5.227z"' +
    'fill="#fff"></path>' +
    '</svg>' +
    '</div>' +
    '<img class="cart_img" src="' + curr_elem.image_url + '">' +
    '<div class="cart_description">' +
    '<div class="cart_name">' + curr_elem.name + '</div>' +
    '<div class="cart_price">' +
    '<div class="cart_item_price">' +
    '<span class="cart_item_price_number">' + ((curr_elem.special_price == null) ? curr_elem.price : curr_elem.special_price) + '</span>' +
    '<span>грн</span>' +
    '</div>' +
    '<div class="cart_amount">' +
    '<div class="cart_minus_block">' +
    '<svg class="cart_inc_btn" viewBox="0 0 19 19"' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<path ' +
    'd="M.806 8.75h17.48c.56 0 .713.336.713.75s-.197.75-.72.75H.81c-.668 0-.81-.336-.81-.75s.142-.75.806-.75z">' +
    '</path>' +
    '</svg>' +
    '</div>' +
    '<div class="cart_amount_number">1</div>' +
    '<div class="cart_plus_block">' +
    '<svg class="cart_inc_btn" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">' +
    '<path ' +
    'd="M10 9h8.5a.5.5 0 0 1 0 1H10v8.5a.5.5 0 1 1-1 0V10H.5a.5.5 0 1 1 0-1H9V.5a.5.5 0 0 1 1 0V9z"' +
    'fill-rule="evenodd" clip-rule="evenodd"></path>' +
    '</svg>' +
    '</div>' +
    '</div>' +
    '<div class="cart_sum">' +
    '<span class="sum_number">' + ((curr_elem.special_price == null) ? curr_elem.price : curr_elem.special_price) + '</span>' +
    '<span>грн</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
  $('.cart_rows').append(result);
  $('.popup_cart #item' + id + ' .cart_minus_block').on('click', function (event) {
    products[id]--;
    recalculate_row($('#item' + id + '.cart_row'), id);
    if (products[id] == 0) cart_remove(id);
  });
  $('.popup_cart #item' + id + ' .cart_plus_block').on('click', function (event) {
    products[id]++;
    recalculate_row($('#item' + id + '.cart_row'), id);
  });
  $('.popup_cart #item' + id + ' .row_close').on('click', function (event) {
    products[id] = 0;
    recalculate_row($('#item' + id + '.cart_row'), id);
    cart_remove(id);
  });
}
function recalculate_row(temp_row, id) {
  temp_row.find('.cart_amount_number')[0].innerText = products[id];
  let curr_elem = items_list.get(id);
  temp_row.find('.sum_number')[0].innerText = products[id] * ((curr_elem.special_price == null) ? curr_elem.price : curr_elem.special_price);
  let total_sum = 0;
  $('.sum_number').each((i, value) => {
    total_sum += parseInt(value.innerText);
  });
  $('.total_sum_number')[0].innerText = total_sum;
}

function cart_add(id) {
  if (products[id] == undefined) products[id] = 0;
  if (products[id] == 0) add_row_to_cart(id);
  else {
    $('.popup_cart #item' + id + ' .cart_amount_number')[0].innerText = products[id] + 1;
  }
  products[id]++;
  recalculate_row($('#item' + id + '.cart_row'), id);
}

function cart_remove(id) {
  let cart_counter_number = $('.cart_counter_number')[0];
  $('#item' + id + '.cart_row').remove();
  if (parseInt(cart_counter_number.innerText) > 0) {
    cart_counter_number.innerHTML = (parseInt(cart_counter_number.innerText) - 1);
  }
  if (parseInt(cart_counter_number.innerText) == 0) {
    $('.cart_empty')[0].style.display = 'block';
    $('.submit_cart')[0].style.display='none';
    document.querySelector('.cart_counter').style.display = "none";
  }
}
// End of old code


let categories_json = new Map();
let current_category = 'all';
let items_list = new Map();
let items_of_categories = new Map();
var products = [];

function read_categories() {
  $.get({
    dataType: "json",
    url: "https://nit.tron.net.ua/api/category/list",
    success: function (data) {
      let temp_elem = '<li class="category"><button id="category_all">All</button></li>';
      $(".categories_list").append(temp_elem);
      $("#category_all").on("click", function (event) {
        show_category("all");
      });
      for (let i = 0; i < data.length; i++) {
        temp_elem = '<li class="category"><button id="category_' + data[i].id + '">' + data[i].name + '</button></li>';
        $(".categories_list").append(temp_elem);
        $('#category_' + data[i].id).on("click", function (event) {
          show_category(data[i].id);
        });
        categories_json.set(data[i].id, data[i]);
      }
    }
  });
}

function items_init(data) {
  data.forEach((value) => {
    if(!items_list.has(value.id)) items_list.set(value.id, value);
    $(".content_space").append(item(value));
    let temp = $('#item' + value.id+'.item');
    temp.on('click', function (event) {
      if (event.target.tagName == 'BUTTON') {
        cart_add(value.id);
        $('.cart_counter')[0].style.display = 'flex';
      }
      else open_item(value.id);
    });
  });
}

function add_category_header(id){
  let category_header = '<div class="category_header"><div class="category_name">'+
    (id!='all' ? categories_json.get(id).name : 'All')+
  '</div><div class="category_description">'+(id!='all' ? categories_json.get(id).description : 'All goods')+'</div></div>';
  $('.content_space').append(category_header);
}

function show_category(id) {
  $(".content_space").empty();
  
  if (items_of_categories.has(id)) {
    add_category_header(id);
    items_init(items_of_categories.get(id));
    current_category = id;
  }
  else {
    if (id == "all") {
      $.get({
        dataType: "json",
        url: "https://nit.tron.net.ua//api/product/list",
        success: function (data) {
          add_category_header(id);
          items_init(data);
          current_category = 'all';
        }
      });
    }
    else {
      $.get({
        dataType: "json",
        url: "https://nit.tron.net.ua/api/product/list/category/" + id,
        success: function (data) {
          items_of_categories.set(id, data);
          add_category_header(id);
          items_init(data);
          current_category = id;
        }
      });
    }
  }
}

function item(elem) {
  let temp_item = '<div class="item" id="item' + elem.id + '">';
  temp_item += '<div class="item_img"><img src="' + elem.image_url + '" alt="Item ' + elem.id + '"></div>';
  temp_item += '<div class="description"> <div class="item_name"> <span>' + elem.name + '</span> </div> <div class="price_block">';
  if (elem.special_price != null) {
    temp_item += '<div> <span class="old_price">' + elem.price + '</span><span class="currency old_price">грн</span> </div>';
    temp_item += '<div> <span class="special_price price">' + elem.special_price + '</span><span class="currency special_price price">грн</span> </div>';
  }
  else {
    temp_item += '<div class = "old_price_div" />';
    temp_item += '<div class = "price_div"> <span class="price">' + elem.price + '</span><span class="currency price">грн</span> </div>';
  }
  temp_item += '</div> </div> <button class="green_button" type="button">Купити</button> </div>';
  return temp_item;
}

function open_item(id) {
  let elem = items_list.get(id);
  let result = '<div class="go_back"> <div><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492"style="enable-background:new 0 0 492 492;" xml:space="preserve">' +
    '<g><g><path d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124 c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844            L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412             c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008             c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788             C492,219.198,479.172,207.418,464.344,207.418z" />   </g> </g>'
    + '</svg></div>';
  if (current_category != 'all') {
    result += '<p class="category_of_item">' + categories_json.get(current_category).name + '</p></div>';
  }
  else {
    result += '<p class="category_of_item">All</p></div>';
  }
  result += '<div class="item_full" id="item' + id + '">' +
    '<div class="item_full_name">' +
    '<span>' + elem.name + '</span></div>' +
    '<div class="item_full_img_box">' +
    '<img src="' + elem.image_url + '" alt="Item ' + id + '"></div>';
  if (elem.special_price != null) {
    result += '<div> <span class="old_price">' + elem.price + '</span><span class="currency old_price">грн</span> </div>' +
      '<div> <span class="special_price price">' + elem.special_price + '</span><span class="currency special_price price">грн</span> </div>';
  }
  else {
    result += '<div class = "old_price_div" />' +
      '<div class = "price_div"> <span class="price">' + elem.price + '</span><span class="currency price">грн</span> </div>';
  }
  result += '<button class="green_button" type="button">Купити</button>' +
    '<p class="description_header">Description</p>' +
    '<div class="item_full_description">' + elem.description + '</div>';
  $('.content_space').empty();
  $('.content_space').append(result);
  $('#item' + id + ' button').on('click', function (event) {
    cart_add(id);
    $('.cart_counter')[0].style.display = 'flex';
  });
  $('.go_back').on('click', function (event) {
    show_category(current_category);
  });
}

function send_cart(){
  const token = "xTrYf3ITtOm4Xb-WeAtV";
  let email=$("input[name='form_email']").val();
  let name=$('input[name="form_name"]').val();
  let phone=$('input[name="form_phone"]').val();
  let sent_data = 'token='+token+'&'+'email='+email+'&name='+name+'&phone='+phone;
  for(let i=0; i<products.length; i++){
    if(products[i]!=null)
    sent_data+='&products['+i+']='+products[i];
  }
  $.ajax({
    type: "POST",
    url: "https://nit.tron.net.ua/api/order/add",
    data: sent_data,
    success: function(data, textStatus){
      console.log(sent_data);
      analyse_response(data, textStatus);
    }
  });
}

function analyse_response(data, textStatus){
  let message_place = $('.message_place');
  message_place.empty();
  if(textStatus!="success"){
    let response_message='<div class="form_response bad">Check your Internet connection!</div>';
    message_place.append(response_message);
  }
  else{
    if(data.status=="success"){
      let response_message='<div class="form_response good">Correct!</div>';
      message_place.append(response_message);
      products=[];
      clear_cart();
    }
    else if(data.errors!=undefined){
      let response_message=" ";
      if(data.errors.name!=undefined)
      response_message+='<div class="form_response bad">'+data.errors.name+'</div>';
      if(data.errors.phone!=undefined)
      response_message+='<div class="form_response bad">'+data.errors.phone+'</div>';
      if(data.errors.email!=undefined)
      response_message+='<div class="form_response bad">'+data.errors.email+'</div>';
      message_place.append(response_message);
    }
    
  }
}

function clear_cart(){
  let empty = $('.cart_empty').clone();
  empty[0].style.display='block';
  $('.cart_rows').empty();
  $('.cart_rows').append(empty);
  $('.submit_cart')[0].style.display='none';
  $('.total_sum_number').empty();
  $('.total_sum_number').append(0);
  $('.cart_counter_number')[0].innerText=0;
  $('.cart_counter')[0].style.display='none';

  $('#submit_forms_btn')[0].style.display='none';
}