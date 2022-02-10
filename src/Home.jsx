import React from "react";
import background from "./images/bg.png"

function Home() {
  return (
    <div style={{ backgroundImage: `url(${background})`}}>
    <div class= "container-fluid pt-5"></div>
    <div className="home">
        <div class="container">
        <div class="row text-center">
          <div class="col-lg-12">
            <img
              class="img-thumbnail text-center"
              src="https://imgur.com/zm7Dpvj.png"
              alt="Release the Krakens!"
            />
          </div>
          <div class= "container-fluid pt-5"></div>
          <div class="col-lg-12">
            <h1 class="display-3 font-weight-light pt-5">Release the Krakens!</h1>
            <h1 class="font-weight-bold pt-5">
              Hafgufa, Krake, Sciu-crak, and Kraken, it goes by many names. It has taken many forms, but all accounts of the legendary Kraken come to the same conclusion.
              It's waiting around to feast on the weak, traveling its' waters. In crypto, whales are the top of the foodchain, and here we give everyone a chance to be one themselves.
              But not all is as it seems. Something about these whales are different. They're changing...evolving...or possibly mutating. Perhaps the olde tales of the Kraken weren't fables.
              Maybe, just maybe, the era of Krakens is returning. 
            </h1>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
            <div class= "container-fluid pt-5"></div>
          </div>
        </div>
      </div>
    </div>
    </div>    
  );
}

export default Home;
