const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
function linkify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, function (url) {
        return url;
    });
}
let crawlDescriptionRecipe = async (link) => {
    const AXIOS_OPTIONS = {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.57',
        },
    };
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(`${link}`, AXIOS_OPTIONS);
            let $ = cheerio.load(data);
            let description = $(data).find('div.pt-2.pb-4 > p').text();
            let dataRecipe = $(data).find('div.row.mb-3');
            let recipe = '';
            for (let element of dataRecipe) {
                let item = $(element).find('div.col');
                for (let el of item) {
                    let title = $(el).find('h4.title_detail.border-bottom').text().trim();
                    let regex = /(<([^>]+)>)/gi;
                    title = String(title);
                    title = title.replace(regex, '').trim();
                    recipe += `\n${title}:\n`;
                    let hehe = $(el).find(' p> i').text().trim();
                    if (hehe) {
                        recipe += `\n${hehe}\n`;
                        hehe = '';
                    }
                    let dataNguyenLieu = [];
                    let nguyenLieu = $(el).find('.block-nguyenlieu > ul > li ');
                    if (nguyenLieu) {
                        for (let li of nguyenLieu) {
                            let item = $(li)
                                .find('span')
                                .text()
                                .replace(regex, '')
                                .replace(/\n/g, '')
                                .replace(/\t/g, '')
                                .replace(/  /, ' ')
                                .trim();
                            if (item !== '') {
                                dataNguyenLieu.push(item);
                            }
                        }
                        recipe += dataNguyenLieu.join('\n') + '\n';
                    }
                    let soChes = $(el).find('div > p ');
                    if (soChes) {
                        for (let soChe of soChes) {
                            let item = $(soChe)
                                .text()
                                .replace(regex, '')
                                .replace(/\n/g, '')
                                .replace(/\t/g, '')
                                .replace(/  /, ' ')
                                .trim();
                            if (item !== '' && item !== 'M: muỗng canh - m: muỗng cafe') {
                                recipe += `${item}\n`;
                            }
                        }
                    }
                }
            }
            let data_crawl = [
                {
                    recipe: recipe,
                    description: description,
                },
            ];
            resolve(data_crawl);
            // console.log(data_crawl);
        } catch (error) {
            reject(error);
        }
    });
};
let getCrawler = async () => {
    const fs = require('fs');
    fs.writeFile('food.json', '', function () {
        console.log('done');
    });
    const AXIOS_OPTIONS = {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.57',
        },
    };
    let objectData = [];
    for (let i = 1; i <= 101; i++) {
        const { data } = await axios.get(`https://monngonmoingay.com/tim-kiem-mon-ngon/page/${i}/`, AXIOS_OPTIONS);
        let $ = cheerio.load(data);

        let information = $(data).find('div.col-sm-3 > div.one-recipes');

        for (let el of information) {
            let singleObj = {};
            let name = $(el).find('div.info-list > a >h3').text();
            let link = $(el).find('div.info-list > a ').attr('href');
            let data_crawl = await crawlDescriptionRecipe(link);
            console.log(data_crawl);
            singleObj.name = name;
            let linkImg1 = $(el).find('div.text-center > a > picture > img ').attr('data-lazy-src');
            let linkImg2 = $(el).find('div.text-center > a  > img ').attr('data-lazy-src');
            if (linkImg1 !== undefined) {
                singleObj.image = linkImg1;
            }
            if (linkImg2 !== undefined) {
                singleObj.image = linkImg2;
            }
            singleObj.link = link;
            if (data_crawl) {
                singleObj.recipe = data_crawl[0].recipe;
                singleObj.description = data_crawl[0].description;
            }

            objectData.push(singleObj);
            if (i % 1 === 0 || i === 101) {
                fs.writeFileSync('food.json', JSON.stringify(objectData, null, 2));
            }
        }
    }
};
getCrawler();
