const getList = () => {
    let container = document.getElementById('resultsCol').children
    let jobList = [];

    for (const child of container) {
        if (child.classList.value === "jobsearch-SerpJobCard unifiedRow row result clickcard") {
            jobList.push(child);
        }
    }

    return jobList;
};

const checkJob = data => {
    let company, position, jobLocation;

    company = document.getElementsByClassName('icl-u-lg-mr--sm icl-u-xs-mr--xs')[0].innerText;
    position = document.getElementsByClassName('icl-u-xs-mb--xs icl-u-xs-mt--none is-embedded jobsearch-JobInfoHeader-title')[0].innerText;
    jobLocation = 

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
};

const apply = () => {
    
    try {
        document.getElementById('vjs-container-iframe').contentWindow.document.getElementsByClassName('icl-Button icl-Button--branded icl-Button--block')[0].click();
    }
    catch {

    }
    
    for (const job of getList()) {

    }
};