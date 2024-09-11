
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

const imgContainer = document.querySelector('.imgContainer');

const wait = (s) => {
   return new Promise(function (resolve) {
    setTimeout(resolve, s * 1000);
   });
};

const createImage = function (imgPath) {
    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });

        img.addEventListener('error', function () {
            reject(new Error('Image not found'));
        });
    });
};

createImage('../../../20.png')
    .then(function () {
        console.log('img is loaded');

        return wait(2);
    })
    .then(() => imgContainer.style.display = 'none')
    .then(() => {
        createImage('../../../29.png');
        imgContainer.style.display = 'block';

    })
    .catch(err => console.error(err))