const courses=[
{icon:"🎬",title:"Video Editing",desc:"Viidiyoo kee qulqulluu fi nama hawwatu taasisuu baradhu.",lessons:["Cut fi trim gochuu","Transition fi effect","Text fi subtitle","Music fi audio","Export qulqullina gaariin"]},
{icon:"✨",title:"Logo Maker",desc:"Logo brand kee bakka bu'u professional hojjedhu.",lessons:["Maqaa brand filachuu","Font fi typography","Color palette","Icon fi shape","PNG/SVG export"]},
{icon:"▶️",title:"YouTube Thumbnail",desc:"Thumbnail namni yeroo argu akka cuqaasuuf qopheessi.",lessons:["Canvas 1280×720","Composition","Text guddaa fi dubbifamuu danda'u","Contrast fi image","Export web-ready"]},
{icon:"💳",title:"Business Card",desc:"Kaardii daldalaa qulqulluu fi print-ready hojjedhu.",lessons:["Name fi logo","Phone, email fi address","Layout","Print size fi bleed","PDF print export"]},
{icon:"📣",title:"Flyer Package",desc:"Flyer hojii, event ykn promotion siif hojjedhu.",lessons:["Headline cimaa","Service/offer","Image placement","Call to action","Social & print export"]}
];
const grid=document.getElementById("courseGrid");
grid.innerHTML=courses.map((c,i)=>`<article class="course"><div class="icon">${c.icon}</div><h3>${c.title}</h3><p>${c.desc}</p><button onclick="toggleLesson(${i})">Barnoota Bani ▾</button><div class="lesson" id="lesson${i}"><b>Kutaa barnootaa:</b><ul>${c.lessons.map(x=>`<li>✓ ${x}</li>`).join("")}</ul><button onclick="completeLesson(${i})">✓ Kutaa kana xumureera</button></div></article>`).join("");
function toggleLesson(i){document.getElementById("lesson"+i).classList.toggle("open")}
function completeLesson(i){alert("Gaarii! "+courses[i].title+" keessatti kutaa kana xumurteetta. 👏")}
const questions=[
["Video Editing keessatti 'Cut' jechuun maal?",["Viidiyoo qooduu/haquu","Logo hojjechuu","Email barreessuu"],0],
["Logo keessatti color palette jechuun maal?",["Maqaa namaa","Walitti dhufeenya halluuwwanii","Sagalee"],1],
["YouTube Thumbnail standard tokko kam?",["1280×720","500×5000","100×100"],0],
["Business Card irratti maal galchuun barbaachisaa dha?",["Contact info","Password","Game"],0],
["Flyer keessatti CTA jechuun maal?",["Call to Action","Color Text Area","Camera Type"],0],
["Design keessatti contrast maal gargaara?",["Wantoota adda baasuuf","File balleessuuf","Internet cufuuf"],0]
];
const qb=document.getElementById("quizBox");
qb.innerHTML=questions.map((q,i)=>`<div class="q"><b>${i+1}. ${q[0]}</b>${q[1].map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}</div>`).join("")+`<button class="btn primary quiz-btn" onclick="checkQuiz()">Qabxii Koo Ilaali</button><div id="result" class="result"></div>`;
function checkQuiz(){let score=0;questions.forEach((q,i)=>{const a=document.querySelector(`input[name="q${i}"]:checked`);if(a&&+a.value===q[2])score++});document.getElementById("result").textContent=`Qabxii kee: ${score}/${questions.length} 🎉`;}
function toggleMenu(){document.getElementById("navLinks").classList.toggle("show")}
document.getElementById("year").textContent=new Date().getFullYear();
