import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { doc, setDoc } from "firebase/firestore"; 

let isAdminUserLoggedOn = false;
let userObject

const firebaseConfig = {
  apiKey: "AIzaSyDd-59p6ehw0HB772jNAlOQBmjkcbnGODo",
  authDomain: "napne-a93b7.firebaseapp.com",
  projectId: "napne-a93b7",
  storageBucket: "napne-a93b7.firebasestorage.app",
  messagingSenderId: "66647027457",
  appId: "1:66647027457:web:a2c058b52cfe3375aa3500",
  measurementId: "G-J6KBWYCWRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const collectionNoticiasDocs = await getDocs(collection(db, "noticias"));
const noticias = collectionNoticiasDocs.docs.reduce((acc, doc) => {
  acc.push(doc.data());
  return acc;
}, []);
const collectionNoticias = collection(db, "noticias")
const nav = document.querySelector("[data-nav='menu']");
const mainPage = document.querySelector('[data-js="main-page"]');
const actualScreen = document.querySelector('[data-screen="initial"]');
const ifrnLogo = document.querySelector('[data-logo="ifrn-logo"]');
const popupContainer = document.querySelector('[data-pop="container"]');
const loginInWithGoogleSubmitButton = document.querySelector('[data-login="google"]');
const logoutSubmitButton = document.querySelector('[data-login="logout"]')
const adminUsers = ['pHXtz03wMshqaKqLVOrjiMKx4zh2', 'Utv9ln2XQlOJDke6tGa5QNg1QbH3']
const navBar = document.querySelector('[data-js="nav"]')

//on snapshot => noticiasParagraph.innerHTML = invocação do for e do if do ADM

ifrnLogo.addEventListener('click', () => {
  const initialScreenNotExists = actualScreen.dataset.screen !== 'initial';

  if (initialScreenNotExists) {
    actualScreen.firstElementChild.remove();
    actualScreen.setAttribute('class', 'napne-logo');
    const img = document.createElement('img');
    img.setAttribute('src', `./imgs/pagina.pngs`);
    actualScreen.dataset.screen = 'initial';
    actualScreen.append(img);
  }
});

// for (let i = 0; i <= noticias.length - 1; i++) {
//   noticiasParagraph.innerHTML += `
//     <div class="titulo"> ${noticias[i].titulo}</div>
//     <p class="texto">${noticias[i].texto}</p>
//     <br>
//     <center><div><img src='${noticias[i].imagem}' width="200" height="200"></img></center>
//     <br>
//     <br> 
//   `;
// }

const logInEvent = () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    isAdminUserLoggedOn = true
    userObject = user
    // const paragraph = document.querySelector('[data-paragraph="text"]')

    // if (adminUsers.includes(user.uid)) {
    //   isAdminUserLoggedOn = true
    //   const button = document.createElement('button')
    //   button.setAttribute('class', 'adicionar_noticia')
    //   button.textContent = 'Cadastrar notícia'

    //   if (actualScreen.dataset.screen === 'noticias') {
    //     actualScreen.insertAdjacentElement('afterbegin', button)

    //   }
    // }
  }).catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // const email = error.customData.email;
    // const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

const showUserInfoIfLogged = user => {
  if (user) {
    loginInWithGoogleSubmitButton.removeEventListener('click', logInEvent)
    loginInWithGoogleSubmitButton.textContent = user.displayName
    logoutSubmitButton.classList.toggle('display_none')
    return
  }
}

const showInsertNoticiaButton = user => {
  const userUid = user.uid
  if (adminUsers.includes(userUid) && actualScreen.dataset.screen === 'noticias') {
    actualScreen.innerHTML += `
      <button data-js="insert_noticia">Cadastrar notícia</button>
    `
    return
  }
}

const showInfo = user => {
  userObject = user
  showUserInfoIfLogged(user)
  showInsertNoticiaButton(user)
}

const handleSignOut = () => signOut(auth).then(() => {
  loginInWithGoogleSubmitButton.textContent = 'Logar'
  logoutSubmitButton.classList.toggle('display_none')
  loginInWithGoogleSubmitButton.addEventListener('click', logInEvent)
  document.querySelector('[data-js="insert_noticia"]').remove()
}).catch(error => {
  console.log(error)
})

onAuthStateChanged(auth, showInfo)

logoutSubmitButton.addEventListener('click', handleSignOut)

loginInWithGoogleSubmitButton.addEventListener('click', logInEvent)
await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});

// const paragraph = document.querySelector('[data-paragraph="text"]')

nav.addEventListener('click', e => {
  const clickedElement = e.target.parentElement.dataset.button;

  if (clickedElement === 'noticias') {
    actualScreen.firstElementChild.remove();
    actualScreen.removeAttribute('class', 'napne-logo');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const noticiasParagraph = document.createElement('p')
    const div = document.createElement('div');
    p.setAttribute('data-paragraph', 'text')
    noticiasParagraph.setAttribute('data-paragraph', 'noticias')

    p.innerHTML = `
    </div>
    <div class="margin"><div class="fonttt">Notícias</div></div>
    <div class="fontp"><p> ⠀⠀⠀⠀O Napne atualmente conta com 67 estudantes matriculados que possuem
    necessidades especiais. Para fornecer a melhor assistencia possivel realizamos atividades que buscam
    a inclusão e estamos sempre inovando para que nossos estudantes se sintam acolhidos. Atividades que são sempre
    acompanhadas por profissionais do Napne e também alunos do campus.</p></div>
    <br> `;
    for (let i = 0; i <= noticias.length - 1; i++) {
      noticiasParagraph.innerHTML += `
        <div class="titulo"> ${noticias[i].titulo}</div>
        <p class="texto">${noticias[i].texto}</p>
        <br>
        <center><div><img src='${noticias[i].imagem}' width="200" height="200"></img></center>
        <br>
        <br> 
      `;
    }

    actualScreen.dataset.screen = 'noticias';
    div.append(h1, p, noticiasParagraph);
    actualScreen.append(div);
    showInsertNoticiaButton(userObject)
    // onSnapshot(collectionNoticias, snapshot => {
    //   snapshot.docs.forEach(docChange => {
    //     noticiasParagraph.innerHTML += `
    //     <div class="titulo"> ${docChange.titulo}</div>
    //     <p class="texto">${docChange.texto}</p>
    //     <br>
    //     <center><div><img src='${docChange.imagem}' width="200" height="200"></img></center>
    //     <br>
    //     <br> 
    //   `
    //   })
    // })
    // const popup = document.querySelector('[data-popup="popup"]');
    // const openPopupButton = document.querySelector('[data-popup="open"]');
    // const closePopupButton = document.querySelector('[data-popup="close"]');
    // const nativeLoginForm = document.querySelector('[data-login="native"]')

    // function abrirPopup() {
    //   popup.style.display = 'block';
    // }
    // function fecharPopup() {
    //   popup.style.display = 'none';
    // }

    // openPopupButton.addEventListener('click', () => {
    //   abrirPopup();
    // });
    // closePopupButton.addEventListener('click', () => {
    //   fecharPopup();
    // });
  }
  if (clickedElement === 'apresentacao') {
    actualScreen.firstElementChild.remove();
    actualScreen.removeAttribute('class', 'napne-logo');
    const p = document.createElement('p');
    const div = document.createElement('div');
    p.setAttribute('class', 'p-text');
    div.innerHTML += `  
    <div class="margin"><div class="fonttt">Apresentação</div></div>
    <div class="fontp"><p> ⠀⠀⠀⠀O núcleo deve ser composto por 08 (oito) membros, devendo compor, obrigatoriamente, caso esteja lotado no campus, pelo
    menos 01 (um) discente, 01 (um) docente, 01 (um) psicólogo, 01 (um) Assistente Social, 01 (um) Intérprete de LIBRAS e 01 (um) (a)
    Pedagogo (a) ou Técnico em Assuntos Educacionais, e 01 (um) representante da comunidade ligado à temática da inclusão social.</p></div>
    <div class="fontp"><p> ⠀⠀⠀⠀Com o objetivo Integrar os diversos segmentos que compõem a comunidade do IFRN por
    meio de ações de sensibilização que favoreçam a corresponsabilidade na construção da ação educativa de
    inclusão social na Instituição. O napne possui vários prossionais contratado que buscam prestar
    assistência aos alunos. Iremos alguns desses profiossionais que estão em exercício em nosso
    campus e suas respectivas funções</p></div>
    <br>
    <br>

      <div class="carousel-container">
        <div class="carousel">
          <img src="./imgs/apre1.png" alt="Image 1">
          <img src="./imgs/apre2.png" alt="Image 2">
          <img src="./imgs/apre3.png" alt="Image 3">
      </div>
  `;
    actualScreen.append(div);
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;
    const intervalTime = 5000; // Change the time (in milliseconds) for the carousel to transition to the next image.
    let timer;
    function startCarousel() {
      timer = setInterval(showNextImage, intervalTime);
    }
    function showNextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    }
    function updateCarousel() {
      const offset = -currentIndex * images[0].width;
      carousel.style.transform = `translateX(${offset}px)`;
    }
    startCarousel();
  }
  if (clickedElement === 'contato') {
    actualScreen.firstElementChild.remove();
    actualScreen.removeAttribute('class', 'napne-logo');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const div = document.createElement('div');
    p.setAttribute('class', 'p-text');
    h1.setAttribute('class', 'proposta-screen');
    actualScreen.dataset.screen = 'contato';
    div.innerHTML += `
  <div class="margin"><div class="fonttt">Contatos</div></div>
  <div class="fontp"><p> ⠀⠀⠀⠀Para entrar em contato conosco basta ligar para o número de qualquer um dos profissionais do Napne.
   Os seus contatos estão disponivéis logo abaixo.</p></div>
  <div class="margin">
  <table id="customers">
  <tr>
    <th>Nome</th>
    <th>Função</th>
    <th>Contato</th>
  </tr>
  <tr>
    <td>Marclzéia Melo de Souza Queiro</td>
    <td>Coordenadora/Pedagoga</td>
    <td>(84) 98808 8182</td>
  </tr>
  <tr>
    <td>Maria Alexandra Ribeiro Pinto</td>
    <td>Representante docente</td>
    <td>(84) 99952 2857</td>
  </tr>
  <tr>
    <td>Anna Nery Dantas Camacho Varela</td>
    <td>Representante docente</td>
    <td>(84) 99411 5687</td>
  </tr>
  <tr>
    <td>Glaudénia Alves De Moura</td>
    <td>Psicóloga</td>
    <td>(84) 99945 7326</td>
  </tr>
  <tr>
    <td>Magnólia Maria da Rocha Melo</td>
    <td>Assistente Social</td>
    <td>(84) 98825 1417</td>
  </tr>
  <tr>
    <td>Suely Katiana Lima Costa Guerra</td>
    <td>Psicopedagoga</td>
    <td>(84) 99198 0725</td>
  </tr>
  <tr>
    <td>Maria Leania Mendes</td>
    <td>Psicopedagoga</td>
    <td>(84) 98795 2587</td>
  </tr>
  <tr>
    <td>Karine Menezes Ribeiro</td>
    <td>Assistente Educacional Inclusivo</td>
    <td>(84) 99625 9291</td>
  </tr>
  <tr>
    <td>Vanuzia Maria De Medeiros</td>
    <td>Ledora</td>
    <td>(84) 99943 8367</td>
  </tr>
  <tr>
    <td>Bartira Raranaya Ge Pontess</td>
    <td>Cuidadora</td>
    <td>(84) 98719 2759</td>
  </tr>
  <tr>
    <td>Alexandre Fagner Garcia Medeiros Rocha</td>
    <td>Intérprete de Lingua de Sinais</td>
    <td>(84) 98200 8568</td>
  </tr>
  <tr>
    <td> Maria Sara Izidio Da Silva</td>
    <td>Intérprete de Lingua de Sinais</td>
    <td>(84) 98856 6589</td>
  </tr>
  <tr>
    <td>Elisberta De Oliveira Araujo</td>
    <td>Intérprete de Lingua de Sinais</td>
    <td>(84) 99947 1341</td>
  </tr>
  </table>
  </div>
  <br>
  <div class="fontp">
  <table><thead><tr>Também conheça nosso instagram:</tr>
  <tr><a href="https://www.instagram.com/napne.mo/?igshid=MmU2YjMzNjRlOQ%3D%3D"><img src='./imgs/insta.png' width="50"></img></a> </tr>
  </thead>
  </table>
  </div>
  `;
    div.append(h1, p);
    actualScreen.append(div);
    scrollTo(0, 400);
  }
  if (clickedElement === 'regimento') {
    actualScreen.firstElementChild.remove();
    actualScreen.removeAttribute('class', 'napne-logo');
    const h1 = document.createElement('h1');
    const a = document.createElement('a');
    const div = document.createElement('div');
    const a2 = document.createElement('a');
    a.setAttribute('class', 'p-text');
    a.setAttribute('href', './docs/Regimento Interno_ NAPNE IFRN_aprovado Consup(1).pdf');
    a2.setAttribute('class', 'p-text');
    a2.setAttribute('href', './docs/regimento.pdf');
    div.innerHTML += `
    <div class="margin"><div class="fonttt">Regimento</div></div>
    <div class="fontp"><p> ⠀⠀⠀⠀O Napne é um departamento do IFRN. No campus Mossoró não é excessão, 
    trabalhamos sobre um regimento que possui varios artigos. Com o intuito de garantir que a
    pluralidade no campus seja mantida de forma que todos os estudantes que tenha necessidades
    especiais, tenham essas necessidades sanadas e atendidas da melhor forma possivel.<br>⠀⠀⠀⠀O Napne visa pela transparencia, dessa forma o nosso regimento interno está disponibilizado
    de forma que qualquer aluno ou docente possa acessa-lo e se tornar ciente 
    de seus direitos e toda a extensão que o Nanpe pode prestar.</p></div>
    <div><a href="./docs/regimento1.pdf" style="text-decoration-line:none;"><p class="link">Clique para baixar o regimento</p></a></div>
    <div class="fontp"><p> ⠀⠀⠀⠀O Napne como qualquer instituição de assistencia publica, opera
    seguindo duas leis que são frutos de muita luta pelos direitos das pessoas com necessidades
    especiais. </p></div>
    <div><a href="./docs/regimento1.pdf" style="text-decoration-line:none;"><p class="link">Clique aqui para baixar as leis</p></a></div>  
    `;
    div.append(h1, a, a2);
    actualScreen.append(div);
  }
});
