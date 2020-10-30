
console.log("JS connected")

const app =
{
    init()
    {
        console.log("JS initialized");

        const homepage = document.querySelector("#homepage_body");
        const now_showing_page = document.querySelector("#now_showing_body");
        const move_details_page = document.querySelector("#movie_details_body");
        const home_section_hover_img = document.querySelectorAll(".hover_img");
        const now_showing_container = document.querySelector("#now_showing_section_div");
        const movie_details_container = document.querySelectorAll(".movie_content");
        const movie_details_div = document.querySelector("#movie_details_div");
        const movie_hero_img = document.querySelector("#movie_hero_img");

        console.log(`Homepage ${homepage}`);
        console.log(`Now Showing ${now_showing_page}`);
        console.log(`Movie Details ${move_details_page}`);

        let api_ep_page_no = 1;
        let dynamic_now_showing_content = "";
        const api_movie = [];

        if(homepage !== null)
        {
            //----- HOMEPAGE IMAGE HOVER CODE - START

            const hover_img_grey_arr = ["img/jumpstory-movie-6-grey.jpg", "img/jumpstory-movie-4-unedited-grey.jpg", "img/jumpstory-movie-9-grey.jpg"];
            const hover_img_colour_arr = ["img/jumpstory-movie-6.jpg", "img/jumpstory-movie-4-unedited.jpg", "img/jumpstory-movie-9.jpg"];

            function grey_to_colour_img()
            {
                for(let img_i=0; img_i<home_section_hover_img.length; img_i++)
                {
                    home_section_hover_img[img_i].addEventListener("mouseover", function(){

                        home_section_hover_img[img_i].src = hover_img_colour_arr[img_i];
                    });    
                }

                for(let img_i=0; img_i<home_section_hover_img.length; img_i++)
                {
                    home_section_hover_img[img_i].addEventListener("mouseout", function(){

                        home_section_hover_img[img_i].src = hover_img_grey_arr[img_i];
                    });    
                }
            }
            
            //----- HOMEPAGE IMAGE HOVER CODE - END
            
            document.addEventListener("DOMContentLoaded", function(){

                console.log("Home Page is NOT NULL");

                grey_to_colour_img();
            });     
        }

        else if(now_showing_page !== null)
        {
            document.addEventListener("DOMContentLoaded", function(){

                console.log("Now Showing Page is NOT NULL");

                const END_POINT = `https://api.themoviedb.org/3/movie/now_playing?api_key=af480c4823ac6c8cc1eb05548e0e6c33&language=en-US&page=${api_ep_page_no}`
                fetch(END_POINT)
                .then((response) => {

                    response.json()
                    .then(data => {

                        console.log(data);

                        for(let i=0; i<data.results.length; i++)
                        {
                            dynamic_now_showing_content += 
                            `
                            <div class="movie_content">
                                <div>
                                    <div class="movie_img">
                                        <a href="../html/movie_details.html">
                                            <img id="movie_img_${i}" src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${data.results[i].poster_path}">
                                        </a>    
                                    </div>
                                </div>
                                <div>
                                    <h3 class="movie_title">
                                        ${data.results[i].title}
                                    </h3>
                                </div>
                                <div>
                                    <h4>
                                        Overview
                                    </h4>
                                    <p class="movie_description">
                                        ${data.results[i].overview.slice(0,97)}...
                                    </p>
                                </div>
                                <div>
                                    <h4 class="movie_release_date">
                                        Release date: ${data.results[i].release_date}
                                    </h4>
                                </div>
                                <div>
                                    <h4 class="movie_review">
                                        Average Review: ${data.results[i].vote_average} / 10
                                    </h4>
                                </div>
                                <div>
                                    <a href="../html/movie_details.html" class="movie_details red_link_buttons" id="movie_details_${i}">
                                        Movie Details
                                    </a>
                                </div>
                            </div>
                            `;

                            api_movie[i] = 
                            {
                                all_data : data,
                                img : `https://image.tmdb.org/t/p/w185_and_h278_bestv2${data.results[i].poster_path}`,
                                title : data.results[i].title,
                                details : data.results[i].overview,
                                date : data.results[i].release_date,
                                review : data.results[i].vote_average,
                                id : data.results[i].id,
                            };
                        }

                        sessionStorage.setItem("movie_details", JSON.stringify(api_movie));

                        now_showing_container.innerHTML = dynamic_now_showing_content;
                        
                        //console.log(`TEST ${now_showing_container.children[0].innerHTML}`);
                    })
                    .then(function(){

                        //console.log(`TEST ${now_showing_container.innerHTML}`);
                        for(let i=0; i<now_showing_container.children.length; i++)
                        {
                            now_showing_container.children[i].addEventListener("click", function(e){

                                const element = e.target;
            
                                if(element.id == `movie_img_${i}` || element.id == `movie_details_${i}`) //element.tagName == "IMG" || element.tagName == "H3")
                                {
                                    //document.location.reload();

                                    //const session_data = api_movie[i];

                                    //alert("ttt");

                                    console.log(api_movie[0]);

                                    sessionStorage.setItem("click_movie", JSON.stringify(api_movie[i]));
                                }
                            })    
                        }
                    })
                    .catch(err => console.log("Error Occurred"))
                })
                .catch(err => console.log("Error Occurred"));  

                //for(j=0; j<movie_details_container.length; j++)
                //{
                     

                     
                //} 
            });
        }
        
        else if(move_details_page !== null)
        {
            document.addEventListener("DOMContentLoaded", function(){

                console.log("Movie Details Page is NOT NULL");

                const session_data = JSON.parse(sessionStorage.getItem("movie_details"));

                const session_data_2 = JSON.parse(sessionStorage.getItem("click_movie"));

                if(session_data_2 == null)
                {
                    alert("hmm!!");
                    
                    location.href = "now_showing.html";
                };

                const END_POINT = `https://api.themoviedb.org/3/movie/${session_data_2.id}/videos?api_key=af480c4823ac6c8cc1eb05548e0e6c33&language=en-US`
                fetch(END_POINT)
                .then((response) => {

                    response.json()
                    .then(data => {

                        console.log(data);

                        movie_hero_img.innerHTML = 
                        `
                        <div class="movie_img">
                            <img src = ${session_data_2.img}>
                        </div>
                        <div id="remove_play_button">
                            <button id="play_trailer" class="youtube_play_button generic_button">
                                <img  src="../img/jumpstory-download20200802-012242.png" alt="A YouTube play icon">
                            </button>
                            <h3>
                                Play Trailer
                            </h3>
                        </div>
                        <div class="modal" id="trailer_modal">
                            <div>
                                <button class="generic_button close_button">
                                    <img src="../img/jumpstory-download20200802-063353.png" alt="close modal button"
                                </button>
                            </div>
                            <div>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/${data.results[0].key}" frameborder="0" 
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                        `

                        const trailer_modal = document.querySelector("#trailer_modal");
                        const close_modal_button = document.querySelector(".close_button")
                        const play_trailer = document.querySelector("#play_trailer");
                        const remove_play_button = document.querySelector("#remove_play_button");
                        const iframe = document.querySelector("iframe")

                        play_trailer.addEventListener("click", function(){

                            trailer_modal.style.display = "unset";
                        });

                        close_modal_button.addEventListener("click", function(){
                            
                            trailer_modal.style.display = "none";
                            iframe.src = `https://www.youtube.com/embed/${data.results[0].key}`;
                        });
                    })
                    .catch(err => console.log("Error Occurred"))
                })
                .catch(err => console.log("Error Occurred"))

                console.log(session_data_2);

                movie_details_div.innerHTML = 
                ` 
                <div>
                    <h3 class="movie_title">
                        ${session_data_2.title}
                    </h3>
                </div>
                <div>
                    <p class="movie_description">
                        ${session_data_2.details}
                    </p>
                </div>
                <div>
                    <h4 class="movie_release_date">
                        Release date: ${session_data_2.date}
                    </h4>
                </div>
                <div>
                    <h4 class="movie_review">
                        Average Review: ${session_data_2.review} / 10
                    </h4>
                </div>
                `
            });
        }

        //----- API FETCH - START



        //----- API FETCH - END
        
        




    }
}

app.init()

