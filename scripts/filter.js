function clearFilters(id)
{
    var form = document.getElementById(id);
    var checkboxes = form.getElementsByTagName("input");
    for(let i = 0; i < checkboxes.length; i++)
    {
        checkboxes[i].checked = false;
    }

    filter();
}

function filter ()
{
    var articles = document.getElementsByTagName("article");
    var numResults = 0;

    // creates nested array where each entry is an array of the valid options from 1 filter category
    var forms = document.getElementsByTagName("form");
    var selectedOptionsByCategory = [];
    for(let i = 0; i < forms.length; i++)
    {
        selectedOptionsByCategory.push(getSelectedOptions(forms[i]));
    }

    console.log("valid options: ");
    for(let i = 0; i < selectedOptionsByCategory.length; i++)
    {
        console.log(selectedOptionsByCategory[i]);
    }
    
    for(let i = 0; i < articles.length; i++)
    {
        var article = articles[i];

        // check if article has at least ONE match in EVERY category
        var valid = true;
        for(let j = 0; j < selectedOptionsByCategory.length; j++)
        {
            valid = valid && checkArticleContainsAtLeastOne(article, selectedOptionsByCategory[j]);

            if(!valid)
            {
                // exit early upon first category mismatch
                break;
            }
        }

        if(valid)
        {
            numResults++;
            showElement(article);
        }
        else 
        {
            hideElement(article);
        }
    }

    var noResultsArticle = document.getElementById("noResults");
    if(numResults > 0)
    {
        hideElement(noResultsArticle);
    }
    else 
    {
        showElement(noResultsArticle);
    }

    var count = document.getElementById("resultCount");
    count.innerHTML = numResults;
}

function getSelectedOptions (form)
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

    // if NONE of the options for this category were checked
    // then treat them all as valid
    if(checkedOptions.length == 0)
    {
        for(let i = 0; i < options.length; i++)
        {
            checkedOptions.push(options[i].name);
        }
    }

    return checkedOptions;
}

function checkArticleContainsAtLeastOne (article, validClasses)
{
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