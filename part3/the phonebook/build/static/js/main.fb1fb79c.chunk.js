(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),l=t.n(u),o=t(4),c=t(2),i=function(e){var n=e.onDelete,t=e.person;return r.a.createElement(r.a.Fragment,null,t.name," ",t.number," ",r.a.createElement("button",{onClick:function(){return n(t)}},"Delete"),r.a.createElement("br",null))},m=function(e){var n=e.persons,t=e.filter,a=e.onDelete,u=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement(i,{key:e.name,person:e,onDelete:a})}));return r.a.createElement(r.a.Fragment,null,u)},s=function(e){return r.a.createElement(r.a.Fragment,null,"filter shown with"," ",r.a.createElement("input",{value:e.value,onChange:e.handleFilter})," ",r.a.createElement("br",null))},d=function(e){var n=e.nameInput,t=e.handleNameChange,a=e.handleNumberChange,u=e.numberInput,l=e.addNewPerson;return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{onClick:l,type:"submit"},"add"))))},f=t(3),b=t.n(f),p="/api/persons",h=function(){return b.a.get(p)},E=function(e){return b.a.post(p,e)},v=function(e,n){return b.a.put("".concat(p,"/").concat(e),n)},g=function(e){return b.a.delete("".concat(p,"/").concat(e))},j=(t(37),function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)}),O=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"success"},n)},w=function(){var e=Object(a.useState)([{name:"Arto Hellas",number:"040-123456"}]),n=Object(c.a)(e,2),t=n[0],u=n[1],l=Object(a.useState)(""),i=Object(c.a)(l,2),f=i[0],b=i[1],p=Object(a.useState)(""),w=Object(c.a)(p,2),C=w[0],N=w[1],k=Object(a.useState)(""),D=Object(c.a)(k,2),F=D[0],I=D[1],S=Object(a.useState)(null),y=Object(c.a)(S,2),T=y[0],A=y[1],P=Object(a.useState)(null),x=Object(c.a)(P,2),J=x[0],L=x[1];Object(a.useEffect)((function(){h().then((function(e){u(e.data)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(j,{message:T}),r.a.createElement(O,{message:J}),r.a.createElement(s,{value:F,persons:t,handleFilter:function(e){return I(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(d,{nameInput:f,numberInput:C,handleNameChange:function(e){return b(e.target.value)},handleNumberChange:function(e){return N(e.target.value)},addNewPerson:function(e){e.preventDefault();var n=t.some((function(e){return e.name===f})),a=t.some((function(e){return e.number===C&&e.name===f}));if(n&&a)alert("".concat(f," is already added to phonebook"));else if(n){if(window.confirm("".concat(f," is already added to the phonebook, replace old number with a new one?"))){var r=t.filter((function(e){return e.name===f}))[0];console.log(r);var l=Object(o.a)(Object(o.a)({},r),{},{number:C});console.log(l),v(r.id,l).then((function(e){console.log(e.data);var n=t,a=n.findIndex((function(e){return e===r}));n[a]=e.data,u(n),L("Edited ".concat(r.name)),setTimeout((function(){return L(null)}),5e3),console.log(n)})).catch((function(e){console.error(e.response.data.error.message),A(e.response.data.error.message),setTimeout((function(){return A(null)}),5e3)})),b(""),N("")}}else{var c={name:f,number:C};E(c).then((function(e){var n=Object(o.a)(Object(o.a)({},c),{},{id:e.data.id});u(t.concat(n)),b(""),N(""),L("Added ".concat(n.name)),setTimeout((function(){return L(null)}),5e3)})).catch((function(e){A(e.response.data.error.message),setTimeout((function(){return A(null)}),5e3)}))}}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(m,{persons:t,filter:F,onDelete:function(e){if(window.confirm("Delete ".concat(e.name," ?"))){var n=t.filter((function(n){return n.id!==e.id}));g(e.id),console.log(n),u(n)}}}))};l.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.fb1fb79c.chunk.js.map