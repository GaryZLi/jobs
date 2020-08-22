let count = 1;
let company;
let position;
let jobLocation;

let handleLoadingData = event => {
    if (event.key === '`') {
        console.log('Press', count, 'times')
        count += 1;

        //--------------------------------------------------------------------------------------------------------------------
        company = document.getElementsByClassName('jobs-details-top-card__company-url')[0]?.innerText 
                    || document.getElementsByClassName('jobs-top-card__company-url')[0]?.innerText;            
        if (!company) return alert('no companies detected');

        //--------------------------------------------------------------------------------------------------------------------
        position = document.getElementsByClassName('jobs-details-top-card__job-title t-20 t-black t-normal')[0]?.innerText
                    || document.getElementsByClassName('jobs-top-card__job-title t-24')[0]?.innerText;
        if (!position) return alert('no positions detected');
        
        //--------------------------------------------------------------------------------------------------------------------
        jobLocation = document.getElementsByClassName('jobs-details-top-card__bullet')[0]?.innerText
                    || document.getElementsByClassName('jobs-top-card__bullet')[0]?.innerText;
        if (!jobLocation) return alert('no location detected');

        if (event.key === '`') {
            console.log('hehe')
            fetch('http://localhost:5000/', {
                method: 'POST',
                body: JSON.stringify({
                    data: [company, position, jobLocation, new Date().toLocaleDateString(), document.baseURI],
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(res=>res.json()).then(res=>{
                if (res.dupe) {
                    alert('dupe!')
                } else {
                    console.log(res)
                }
            }
            ).catch(err=>console(err));
        }
    }
};

let checkData = () => {
    console.log('checking data')
    //--------------------------------------------------------------------------------------------------------------------
    company = document.getElementsByClassName('jobs-details-top-card__company-url')[0]?.innerText 
        || document.getElementsByClassName('jobs-top-card__company-url')[0]?.innerText;            
    if (!company) return alert('no companies detected');

    //--------------------------------------------------------------------------------------------------------------------
    position = document.getElementsByClassName('jobs-details-top-card__job-title t-20 t-black t-normal')[0]?.innerText
        || document.getElementsByClassName('jobs-top-card__job-title t-24')[0]?.innerText;
    if (!position) return alert('no positions detected');

    //--------------------------------------------------------------------------------------------------------------------
    jobLocation = document.getElementsByClassName('jobs-details-top-card__bullet')[0]?.innerText
        || document.getElementsByClassName('jobs-top-card__bullet')[0]?.innerText;
    if (!jobLocation) return alert('no jobLocations detected');

    fetch('http://localhost:5000/checkData', {
        method: 'POST',
        body: JSON.stringify({
            data: [company, position, jobLocation, new Date().toLocaleDateString(), document.baseURI],
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(res=>res.json()).then(res=>{
        if (res.dupe) {
            alert('dupe!')
        } else {
            console.log(res)
        }
    }
    ).catch(err=>console(err));
}


document.addEventListener('keyup', e => handleLoadingData(e));
document.removeEventListener('keyup', e => handleLoadingData(e));

document.getElementsByClassName('jobs-search-results jobs-search-results--is-two-pane')[0].addEventListener('click', checkData);