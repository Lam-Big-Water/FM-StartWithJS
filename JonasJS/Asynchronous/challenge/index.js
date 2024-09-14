
// 1. Challenge #1
// const local = document.querySelector('.local');
// console.log(local)

// function renderText(data) {
//     local.textContent = `${data}`
// }



// function whereAmI (lat, lng) {
//     fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//         .then(function (response) {
//             if (!response.ok) throw new Error(`Something is wrong... ${response.status}`)
//            return response.json()
//         })
//         .then((data) => {
//             if (!data.state) throw new Error(`Can't found the state`)
//             const total = [data.state, lat, lng]
//             renderText(total)
//         })
//         .catch((err) => renderText(err.message))
// }

// whereAmI(52.508, 13.381);



// Challenge #2

// const imgContainer = document.querySelector('.imgContainer');

// const wait = (s) => {
//    return new Promise(function (resolve) {
//     setTimeout(resolve, s * 1000);
//    });
// };

// const createImage = function (imgPath) {
//     return new Promise(function (resolve, reject) {
//         const img = document.createElement('img');
//         img.src = imgPath;

//         img.addEventListener('load', function () {
//             imgContainer.append(img);
//             resolve(img);
//         });

//         img.addEventListener('error', function () {
//             reject(new Error('Image not found'));
//         });
//     });
// };

// createImage('../../../20.png')
//     .then(function () {
//         console.log('img is loaded');

//         return wait(2);
//     })
//     .then(() => imgContainer.style.display = 'none')
//     .then(() => {
//         createImage('../../../29.png');
//         imgContainer.style.display = 'block';

//     })
//     .catch(err => console.error(err))


// Challenge #3
const URL = 'https://www.nasa.gov/wp-content/uploads/2023/01/webb-tarantula-neb.png?resize=1200,937';
const URL2 = 'https://science.nasa.gov/wp-content/uploads/2024/08/andromedaiii-acs-1-flat-crop-cont-final.jpg?w=1536&format=webp';

const imgContainer = document.querySelector('.imgContainer');

const wait = (sec) => {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

const createImage = (URL) => {
    return new Promise(function(resolve, reject) {
        const img = document.createElement('img');
        img.src = URL;

        img.addEventListener('load', () => {
            imgContainer.append(img);
            resolve(img);
        })

        img.addEventListener('error', () => {
            reject(new Error('Image not found'))
        })

    })
}

// PART 1
// createImage(URL)
//     .then(() => {
//         console.log('picture 1 is loaded')
//         return wait(2)
//     })
//     .then(() => {
//         createImage(URL2)
//     })
//     .then(() => {
//         console.log('picture 2 is loaded');
//     })


const URL3 = [URL, URL2];

const loadAll = async (imgArr) => {
    try {
        const imgs = imgArr.map(async function (img) {
            return await createImage(img)
        });
        const imgEl = await Promise.all(imgs);
        console.log(imgEl);
    } catch (e) {
        console.error(err);
    }

}

loadAll(URL3);