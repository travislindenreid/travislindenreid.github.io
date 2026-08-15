function clearFilters(id)
{
    var form = document.getElementById(id);
    var checkboxes = form.getElementsByTagName("input");
    for(let i = 0; i < checkboxes.length; i++)
    {
        checkboxes[i].checked = false;
    }

    refreshCount();
}

function filter ()
{
    let articleInfo = findValidArticles();

    for(let i = 0; i < articleInfo.valid.length; i++)
    {
        showElement(articleInfo.valid[i]);
    }

    for(let i = 0; i < articleInfo.invalid.length; i++)
    {
        hideElement(articleInfo.invalid[i]);
    }

    var noResultsArticle = document.getElementById("noResults");
    console.log("results: " + articleInfo.valid.length);
    if(articleInfo.valid.length > 0)
    {
        hideElement(noResultsArticle);
    }
    else 
    {
        showElement(noResultsArticle);
    }
}

function findValidArticles ()
{
    var validArticles = [];
    var invalidArticles = [];

    var subjectForm = document.getElementById("subjectFilters");
    let validSubjects = getCheckedOptions(subjectForm);

    var equipmentForm = document.getElementById("equipmentFilters");
    let validEquipment = getCheckedOptions(equipmentForm);

    var articles = document.getElementsByTagName("article");
    for(let i = 0; i < articles.length; i++)
    {
        var article = articles[i];

        let subjectValid = checkCategoryValid(article, validSubjects);
        let equipmentValid = checkCategoryValid(article, validEquipment);

        if(subjectValid && equipmentValid)
        {
            validArticles.push(article);
        }
        else 
        {
            invalidArticles.push(article);
        }
    }

    const info = {
        valid: validArticles,
        invalid: invalidArticles
    }
    return info;
}

function getCheckedOptions (form)
{
    var options = form.getElementsByTagName("input");
    checkedOptions = [];
    for(let i = 0; i < options.length; i++)
    {
        if(options[i].checked)
        {
            checkedOptions.push(options[i].name);
        }
    }
    return checkedOptions;
}

function checkCategoryValid (article, validClasses)
{
    if(validClasses.length == 0)
    {
        return true;
    }

    var subjectValid = false;
    for(let j = 0; j < validClasses.length; j++)
    {
        if(article.classList.contains(validClasses[j]))
        {
            subjectValid = true;
            break;
        }
    }
    return subjectValid;
}

function hideElement (e)
{
    e.style.display = "none";
}

function showElement (e)
{
    e.style.display = "block";
}

function refreshCount ()
{
    let articleResults = findValidArticles();
    var count = document.getElementById("resultCount");
    count.innerHTML = articleResults.valid.length;
}