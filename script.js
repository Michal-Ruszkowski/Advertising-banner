fetch('https://rekrutacja.webdeveloper.rtbhouse.net/files/banner_vip.json')
  .then(res => res.json())
  .then(data => {
    initProducts(data.offers)
    animateElements(data.offers);
  })
  .catch(error => {
    console.error(error);
  });

const initProducts = products => {
  const container = document.querySelector('.products')
  const dots = document.querySelector('.dots')
  products.forEach(el => {
    const product = document.createElement('div');
    product.className = 'product';

    const img = document.createElement('img')
    img.src = el.imgURL;
    img.alt = el.city;
    img.className = 'product__img';

    const country = document.createElement('p');
    country.className = 'product__country';
    country.innerText = el.country;

    const countryContainer = document.createElement('div');
    countryContainer.className = 'product__countryContainer';
    countryContainer.appendChild(country);

    const city = document.createElement('p');
    city.className = 'product__city';
    city.innerText = el.city;
    if (city.innerText.length > 8) {
      city.style.fontSize = '35px'
    } 
    if (city.innerText.length > 10) {
      city.style.fontSize = '25px'
    }
    if (city.innerText.length > 14) {
      city.style.fontSize = '18px'
    }

    const cityContainer = document.createElement('div');
    cityContainer.className = 'product__cityContainer';
    cityContainer.appendChild(city);

    const locationContainer = document.createElement('div');
    locationContainer.className = 'product__locationContainer';
    locationContainer.appendChild(countryContainer)
    locationContainer.appendChild(cityContainer);

    const price = document.createElement('p');
    price.className = 'product__price';
    price.innerText = `${el.price} ${el.currency}`;

    const priceText = document.createElement('p');
    priceText.className = 'product__priceText';
    priceText.innerText = el.priceText;

    const priceContainer = document.createElement('div');
    priceContainer.className = 'product__priceContainer';
    priceContainer.appendChild(priceText)
    priceContainer.appendChild(price)

    const dot = document.createElement('div')
    dot.className = 'dots__dot';
    dots.appendChild(dot)

    product.appendChild(img)
    product.appendChild(locationContainer)
    product.appendChild(priceContainer)

    container.appendChild(product)

  });
}

const animateElements = (products) => {

  const dots = document.querySelectorAll('.dots__dot')
  dots[0].classList.add('dots__dot--active')

  const timeline = gsap.timeline()
    .to('.yellow', {
      delay: 0.2,
      duration: 0.3,
      y: "-=600",
    })
    .to('.logo', {
      delay: .1,
      duration: 0.3,
      x: "+=180"
    })
    .to('.logo', {
      delay: .2,
      duration: 0.5,
      y: "-=235"
    })
    .to('.yellow', {
      delay: 0.2,
      duration: 0.3,
      y: "-=600",
    })
    .to('.dots', {
      delay: .1,
      duration: .1,
      y: '-=70'
    })

  let firstAnimation = true;

  const productAnimation = () => {
    const scaleImg = gsap.timeline()
      .set('.product__img', {
        scale: 1,
      })
      .to('.product__img', {
        duration: 13.5,
        scale: 1.8,
        ease: "linear",
      })


    products.forEach((prod, index) => {

      timeline
        .to('.product__countryContainer', {
          duration: .3,
          x: '+=500'
        }, "-=.5")
        .to('.product__country', {
          duration: .3,
          y: '-=100'
        })
        .to('.product__cityContainer', {
          duration: .3,
          x: '+=500'
        }, "-=.3")
        .to(['.product__price', '.product__priceText'], {
          duration: .3,
          y: '-=100'
        })

      if (index === 0 && firstAnimation) {
        firstAnimation = false
        timeline
          .to('.button', {
            duration: .3,
            x: '-=195'
          }, "-=.3")
          .to('.yellowLineContainer__line', {
            duration: .3,
            x: '+=74'
          }, "-=.3")
      }

      timeline
        .to('.product__city', {
          duration: .1,
          y: '-=100'
        })
        .to('.product__country', {
          delay: 2,
          duration: .2,
          y: '-=100'
        })
        .to('.product__city', {
          duration: .2,
          y: '-=100'
        })
        .to(['.product__price', '.product__priceText'], {
          duration: .2,
          y: '-=100'
        }, "-=.2")
        .to('.product__countryContainer', {
          duration: .3,
          x: '-=500'
        }, "-=.2")
        .to('.product__cityContainer', {
          duration: .3,
          x: '-=500'
        }, "-=.2")
        .set(['.product__price', '.product__priceText', '.product__country', '.product__city'], {
          y: '+=200'
        })

      let width = '-=300';
      if (index === products.length - 1) width = `+=${300 * (products.length - 1)}`

      timeline
        .to('.product', {
          duration: .5,
          x: width,
          onComplete: () => {
            changeDot(index)
            if (index === products.length - 1) {
              productAnimation();
            }
          }
        })
    })
  }

  const changeDot = (index) => {
    const activeDot = document.querySelector('.dots__dot--active')

    if (activeDot) {
      activeDot.classList.remove('dots__dot--active')
    }

    const nextDot = dots[index + 1] || dots[0]

    nextDot.classList.add('dots__dot--active')
  }

  productAnimation()

}