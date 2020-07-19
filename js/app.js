
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

        console.log(`Homepage ${homepage}`);
        console.log(`Now Showing ${now_showing_page}`);
        console.log(`Movie Details ${move_details_page}`);

        let api_ep_page_no = 1;
        let dynamic_now_showing_content = "";

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
                                            <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2${data.results[i].poster_path}">
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
                                    <a href="../html/movie_details.html" class="movie_details red_link_buttons">
                                        Movie Details
                                    </a>
                                </div>
                            </div>
                            `;

                            console.log(`TEST ${i}`);

                            sessionStorage.setItem("movie_details", JSON.stringify(dynamic_now_showing_content[i]));
                        }

                        now_showing_container.innerHTML = dynamic_now_showing_content;
                    })
                    .catch(err => console.log("Error Occurred"))
                })
                .catch(err => console.log("Error Occurred"));  

                for(j=0; j<movie_details_container.length; j++)
                {
                    movie_details_container[j].addEventListener("click", function(){

                        location.href = "../html/movie_details.html";
                    })    
                } 
            });
        }
        
        else if(move_details_page !== null)
        {
            document.addEventListener("DOMContentLoaded", function(){

                console.log("Movie Details Page is NOT NULL");

                const session_data = JSON.parse(sessionStorage.getItem("movie_details"));
            });
        }

        //----- API FETCH - START



        //----- API FETCH - END
        
        




    }
}

app.init()

