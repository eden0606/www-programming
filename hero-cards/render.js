/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Eden Chou
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card

    let heroCard = 
    `<div id=${hero.id} class="card hero-card">
        <div class="card-image">
        <figure class="image is-48by48 card-figure">
            <div class="hero-image-div" style="background-color: ${hero.backgroundColor};">
                <div class="hero-image-inner-div">
                    <img class="is-rounded" id="hero-img style="border: 5px solid ${hero.color};" src= ${hero.img} alt="hero image">
                        <p class="title is-4 hero-title" style="color: ${hero.color};"><span>${hero.name}</span></p>
                </div>
            </div>
        </figure>
        </div>
        <div class="card-content">
        <div class="media">
            <div class="media-content">
            <p class="title is-4 centered-text">${hero.first} ${hero.last}</p>
            <p class="subtitle is-6 centered-text"><em>${hero.subtitle}</em></p>
            </div>
        </div>

        <div class="content">
            ${hero.description}
            <br>
            <br>
            <p><em>First Seen: ${hero.firstSeen.getMonth() + 1}/${hero.firstSeen.getDate()}/${hero.firstSeen.getFullYear()}</em></p>
        </div>
        </div>
        <button id="edit" class="button is-dark hero-button ${hero.id}">Edit</button>
  </div>`;

    return heroCard;
};

export const renderChangedCard = function(hero) {
    let heroCard = `<div class="card-image">
        <figure class="image is-48by48 card-figure">
            <div class="hero-image-div" style="background-color: ${hero.backgroundColor};">
                <div class="hero-image-inner-div">
                    <img class="is-rounded" id="hero-img style="border: 5px solid ${hero.color};" src= ${hero.img} alt="hero image">
                        <p class="title is-4 hero-title" style="color: ${hero.color};"><span>${hero.name}</span></p>
                </div>
            </div>
        </figure>
        </div>
        <div class="card-content">
        <div class="media">
            <div class="media-content">
            <p class="title is-4 centered-text">${hero.first} ${hero.last}</p>
            <p class="subtitle is-6 centered-text"><em>${hero.subtitle}</em></p>
            </div>
        </div>

        <div class="content">
            ${hero.description}
            <br>
            <br>
            <p><em>First Seen: ${hero.firstSeen.getMonth() + 1}/${hero.firstSeen.getDate()}/${hero.firstSeen.getFullYear()}</em></p>
        </div>
        </div>
        <button id="edit" class="button is-dark hero-button ${hero.id}">Edit</button>`;
    

    return heroCard;
}



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form

    let heroCardEdit = 
    `<div id=${hero.id} class="card hero-card">
        <div class="card-image">
        <figure class="image is-48by48 card-figure">
            <div class="hero-image-div" style="background-color: ${hero.backgroundColor};">
                <div class="hero-image-inner-div">
                    <img class="is-rounded" id="hero-img style="border: 5px solid ${hero.color};" src= ${hero.img} alt="hero image">
                        <p class="title is-4 hero-title" style="color: ${hero.color};"><span>${hero.name}</span></p>
                </div>
            </div>
        </figure>
        </div>
        <div class="card-content">
        <div class="content">
            <form id="hero-form">
                <div class="field">
                    <label class="label">Hero Name</label>
                    <div class="control">
                        <input id="hero-name-input" class="input" type="text" value=${hero.name}>
                    </div>
                </div>
                <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                        <input id="first-name-input" class="input" type="text" value="${hero.first}">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                        <input id="last-name-input" class="input" type="text" value="${hero.last}">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Subtitle</label>
                    <div class="control">
                        <input id="subtitle-input" class="input" type="text" value="${hero.subtitle}">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <textarea id="desc-input" class="textarea">${hero.description}</textarea>
                    </div>
                </div>
                <div class="field">
                    <label class="label">First Seen</label>
                    <div class="control">
                        <input id="first-seen-input" class="input" type="text" value="${hero.firstSeen.getMonth() + 1 + "/" + hero.firstSeen.getDate() + "/" + hero.firstSeen.getFullYear()}">
                    </div>
                </div>
                <div class="field is-grouped is-grouped-centered">
                    <p class="control">
                    <button id="save" class="button is-dark ${hero.id}" type="submit">Save</button>
                        
                    </p>
                    <p class="control">
                    <button id="cancel" class="button is-light ${hero.id}">Cancel </button>
                    </p>
                </div>
            </form>
        </div>
        
    </div>
    </div>`;
    
    return heroCardEdit;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead

    for (let i = 0; i < heroicData.length; i++) {
        if ($(event.target).hasClass(heroicData[i].id)) {
            $(`#${heroicData[i].id}`).replaceWith(renderHeroEditForm(heroicData[i]));
        }
    }
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead

    for (let i = 0; i < heroicData.length; i++) {
        if ($(event.target).hasClass(heroicData[i].id)) {
            $(`#${heroicData[i].id}`).replaceWith(renderHeroCard(heroicData[i]));
        }
    }

};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead

    for (let i = 0; i < heroicData.length; i++) {
        if ($(event.target).hasClass(heroicData[i].id)) {
            //let changedData = $('#hero-form').serializeArray();
            // $('#hero-form').submit(function() {
            //     // Get all the forms elements and their values in one step
            //     var $inputs = $('#hero-form :input');
            //     $inputs.each(function() {
            //         heroicData[i][this.name] = $(this).val();
            //      });
            
            // });

            // if(heroicData.filter(hero => hero.name !== document.getElementById('hero-name-input').value)) {
            //     heroicData[i]['name'] = document.getElementById('hero-name-input').value;
            // }

            // if(heroicData.filter(hero => hero.firstSeen !== document.getElementById('first-seen-input').value)) {
            //     heroicData[i]['firstSeen'] = new Date('09/01/1962');
            //     // heroicData[i]['firstSeen'] = new Date(document.getElementById('first-seen-input').value);
            // }

            heroicData[i]['name'] = document.getElementById('hero-name-input').value;
            heroicData[i]['first'] = document.getElementById('first-name-input').value;
            heroicData[i]['last'] = document.getElementById('last-name-input').value;
            heroicData[i]['subtitle'] = document.getElementById('subtitle-input').value;
            heroicData[i]['description'] = document.getElementById('desc-input').value;
            heroicData[i]['firstSeen'] = new Date(document.getElementById('first-seen-input').value);
        
        

            //console.log($('#hero-name-input').value);
            // $('.hero-form').submit(function() {
            //     let changedData = $('.hero-form :input');
            //     // changedData.each(function() {
            //     //     values[this.name] = $(this).val();
            //     // });
            //     // heroicData.first = changedData[0];
            //     // console.log(changedData[0]);
            //     // $inputs.each(function() {
            //     //     changedData[this.name] = $(this).val();
            //     // });
            //   });
            // let removeCard = heroicData[i].id;
            // $(`#${removeCard}`).html(renderChangedCard(heroicData[i]));

            $(`#${heroicData[i].id}`).replaceWith(renderHeroCard(heroicData[i]));

            // $(`#${heroicData[i].id}`).remove();
            // $('#root').append(renderHeroCard(heroicData[i]));
        }
    }
    
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    for (let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    }

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    $('#root').on('click', '#edit', heroicData, handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form


    $('#root').on('click', '#save', heroicData, handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button

    $('#root').on('click', '#cancel', heroicData, handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
