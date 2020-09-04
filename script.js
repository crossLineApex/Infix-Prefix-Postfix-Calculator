var a,b,c;
a = "infix";
b = "infix";
c = "postfix";
function myfunc(){
a = document.getElementById('myselct-from').value;
b = document.getElementById('myselct-to').value;
}

function myclick(){
let exp = document.getElementById('inp1').value;
if(exp !== "")
{
if (a+b === "infixpostfix") {
  console.log(a+ "  "+b);
  console.log(infix_to_postfix(exp));
  document.getElementById('answer').style.display = "block";
  document.getElementById('answer').innerText = infix_to_postfix(exp);

}
else if(a+b === "infixprefix"){
  console.log(a+ "  "+b);
  console.log(infix_to_prefix(exp));
  document.getElementById('answer').style.display = "block";
  document.getElementById('answer').innerText = infix_to_prefix(exp);
}
else if (a+b === "prefixinfix") {
  console.log(a+ "  "+b);
  console.log(prefix_to_infix(exp));
  document.getElementById('answer').style.display = "block";
  document.getElementById('answer').innerText = prefix_to_infix(exp);
}
else if (a+b === "prefixpostfix") {
  console.log(a+ "  "+b);
  console.log(prefix_to_postfix(exp));
  document.getElementById('answer').style.display = "block";
  document.getElementById('answer').innerText = prefix_to_postfix(exp);
}
else if (a+b === "postfixinfix") {
  console.log(a+ "  "+b);
  console.log(postfix_to_infix(exp));
  document.getElementById('answer').style.display = "block";
  document.getElementById('answer').innerText = postfix_to_infix(exp);
}
else if (a+b === "postfixprefix") {
  console.log(a+ "  "+b);
  console.log(postfix_to_prefix(exp));
  document.getElementById('answer').style.display = "block";
  document.getElementById('answer').innerText = postfix_to_prefix(exp);
}
else if (a === b) {
  console.log("same");
  document.getElementById('answer').style.display = "block";
  document.getElementById('answer').innerText = exp;
}
}
}

function evaloption(){
  c = document.getElementById('myeval').value;

}

function myeval(){
  let exp = document.getElementById('inp2').value;
  if (exp !== "") {
    if (c === "postfix") {
      console.log(postfix_numeric_eval(exp));
      document.getElementById('ans').style.display = "block";
      document.getElementById('ans').innerText = postfix_numeric_eval(exp);
    }
    else {
      console.log(prefix_numeric_eval(exp));
      document.getElementById('ans').style.display = "block";
      document.getElementById('ans').innerText = prefix_numeric_eval(exp);
    }
  }
}
function rev(a){
  let st="";
  for (let i = 0; i < a.length; i++) {
    let ch = a.charAt(i);
    if(ch == '('){
             st = ')'+st;
             continue;
         }
         if(ch == ')'){
             st = '('+st;
             continue;
         }
    st = ch + st;
  }
  return st;
}
function isEmpty(a){
  if(a.length < 1){
    return false;
  }
  else {
    return true;
  }
}
function precedence(a){
  if (a === '+' || a ==='-') {
    return 1;
  }
  if (a === '*' || a ==='/') {
    return 2;
  }
  if (a === '(' || a ===')') {
    return 3;
  }
  return -1;
}

function peek(a){
    return (a[a.length-1]);
}
function infix_to_postfix(a){
  let s=[]; let input = a; let output=""; let invalid = false;
  for(let i=0;i<input.length;i++)
          {

              let ch = input.charAt(i);
              if(ch !== ')' && ch !== '(' && ch !== '+' && ch !== '-' && ch !== '*' && ch !== '/')
              {
                  output=output+ch;
              }
              else if(ch == ')')
              {
                  while(peek(s)!='(')
                  {
                      output+=s.pop();
                  }
                  s.pop();
              }
              else{
                  while(isEmpty(s) === true)
                  {
                      if(peek(s)== '(')
                      {
                          //s.pop();
                          break;
                      }
                      if(precedence(peek(s)) < precedence(ch)){
                          //output+=s.pop();
                          break;
                      }
                      output+=s.pop();
                  }
                  s.push(ch);
              }
          }
          while(isEmpty(s) === true){
              output+=s.pop();
          }
            return(output);
}
function infix_to_prefix(a){
  let s=[]; let input = rev(a); let output=""; let invalid = false;
  for(let i=0;i<input.length;i++)
          {

              let ch = input.charAt(i);
              if(ch !== ')' && ch !== '(' && ch !== '+' && ch !== '-' && ch !== '*' && ch !== '/')
              {
                  output=output+ch;
              }
              else if(ch == ')')
              {
                  while(peek(s)!='(')
                  {
                      output+=s.pop();
                  }
                  s.pop();
              }
              else{
                  while(isEmpty(s) === true)
                  {
                      if(peek(s)== '(')
                      {
                          //s.pop();
                          break;
                      }
                      if(precedence(peek(s)) < precedence(ch)){
                          //output+=s.pop();
                          break;
                      }
                      output+=s.pop();
                  }
                  s.push(ch);
              }
          }
          while(isEmpty(s) === true){
              output+=s.pop();
          }
            return(rev(output));
}

function postfix_numeric_eval(a){
  let stack=[];
  let out,inp; out = ""; inp = a; let s ="";
  for(let i = 0 ; i < inp.length; i++){
    var ch = inp.charAt(i);
    s= s + ch;
    if(s === "+"){
      let a = parseInt(stack.pop());
      let b = parseInt(stack.pop());
      out = b + a;
      stack.push(out.toString());
    }
    else if(s === "-"){
      let a = parseInt(stack.pop());
      let b = parseInt(stack.pop());
      out = b - a;
      stack.push(out.toString());
    }
    else if(s === "*"){
      let a = parseInt(stack.pop());
      let b = parseInt(stack.pop());
      out = b * a;
      stack.push(out.toString());
    }
    else if(s === "/"){
      let a = parseInt(stack.pop());
      let b = parseInt(stack.pop());
      out = b / a;
      stack.push(out.toString());
    }
    else{
      stack.push(s);
    }
    s="";
  }
  //console.log(stack);
  return(stack.pop());
}

function prefix_numeric_eval(a){
  let stack=[];
  let out,inp; out = ""; inp = a; let s ="";
  for(let i = inp.length - 1 ; i >= 0; i--){
    var ch = inp.charAt(i);
    s= s + ch;
    if(s === "+"){
      let a = parseInt(stack.pop());
      let b = parseInt(stack.pop());
      out = a + b;
      stack.push(out.toString());
    }
    else if(s === "-"){
      let a = parseInt(stack.pop());
      let b = parseInt(stack.pop());
      out = a - b;
      stack.push(out.toString());
    }
    else if(s === "*"){
      let a = parseInt(stack.pop());
      let b = parseInt(stack.pop());
      out = a * b;
      stack.push(out.toString());
    }
    else if(s === "/"){
      let a = parseInt(stack.pop());
      let b = parseInt(stack.pop());
      out = a / b;
      stack.push(out.toString());
    }
    else{
      stack.push(s);
    }
    s="";
  }
  //console.log(stack);
  return(stack.pop());
}

function postfix_to_infix(a){
let stack=[];
let out,inp; out = ""; inp = a; let s ="";
for(let i = 0 ; i < inp.length; i++){
  var ch = inp.charAt(i);
  s= s + ch;
  if(s === "+"){
    let a = stack.pop();
    let b = stack.pop();
    out = b + "+" + a;
    stack.push(out);
  }
  else if(s === "-"){
    let a = stack.pop();
    let b = stack.pop();
    out = b + "-" + a;
    stack.push(out);
  }
  else if(s === "*"){
    let a = stack.pop();
    let b = stack.pop();
    out = b + "*" + a;
    stack.push(out);
  }
  else if(s === "/"){
    let a = stack.pop();
    let b = stack.pop();
    out = b + "/" + a;
    stack.push(out);
  }
  else{
    stack.push(s);
  }
  s="";
}
//console.log(stack);
return(stack.pop());
}

function prefix_to_infix(a){
  let stack=[];
  let out,inp; out = ""; inp = a; let s ="";
  for(let i = (inp.length - 1); i >= 0; i--){
    var ch = inp.charAt(i);
    s= s + ch;
    if(s === "+"){
      let b = stack.pop();
      let a = stack.pop();
      out = b + "+" + a;
      stack.push(out);
    }
    else if(s === "-"){
      let b = stack.pop();
      let a = stack.pop();
      out = b + "-" + a;
      stack.push(out);
    }
    else if(s === "*"){
      let b = stack.pop();
      let a = stack.pop();
      out = b + "*" + a;
      stack.push(out);
    }
    else if(s === "/"){
      let b = stack.pop();
      let a = stack.pop();
      out = b + "/" + a;
      stack.push(out);
    }
    else{
      stack.push(s);
    }
    s="";
}
return(stack.pop());
}

function postfix_to_prefix(a){
  let stack=[];
  let out,inp; out = ""; inp = a; let s ="";
  for(let i = 0 ; i < inp.length; i++){
    var ch = inp.charAt(i);
    s= s + ch;
    if(s === "+"){
      let a = stack.pop();
      let b = stack.pop();
      out = "+" + b + a;
      stack.push(out);
    }
    else if(s === "-"){
      let a = stack.pop();
      let b = stack.pop();
      out = "-" + b + a;
      stack.push(out);
    }
    else if(s === "*"){
      let a = stack.pop();
      let b = stack.pop();
      out ="*" + b + a;
      stack.push(out);
    }
    else if(s === "/"){
      let a = stack.pop();
      let b = stack.pop();
      out ="/" + b + a;
      stack.push(out);
    }
    else{
      stack.push(s);
    }
    s="";
  }
    return(stack.pop());
}
function prefix_to_postfix(a){
  let stack=[];
  let out,inp; out = ""; inp = a; let s ="";
  for(let i = inp.length - 1 ; i >= 0; i--){
    var ch = inp.charAt(i);
    s= s + ch;
    if(s === "+"){
      let a = stack.pop();
      let b = stack.pop();
      out = a + b + "+";
      stack.push(out);
    }
    else if(s === "-"){
      let a = stack.pop();
      let b = stack.pop();
      out = a + b +"-";
      stack.push(out);
    }
    else if(s === "*"){
      let a = stack.pop();
      let b = stack.pop();
      out = a + b + "*";
      stack.push(out);
    }
    else if(s === "/"){
      let a = stack.pop();
      let b = stack.pop();
      out = a + b + "/";
      stack.push(out);
    }
    else{
      stack.push(s);
    }
    s="";
  }
    return(stack.pop());
}
