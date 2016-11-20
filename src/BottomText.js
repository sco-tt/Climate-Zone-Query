import React from 'react';

const BottomText = (props) => {
  return (
    <div className="bottomText">
      <div className="bottomText__faq">
        <h2>What is this?</h2>
        <p>The Köppen-Geiger climate classification is a taxonomy of the climates of the Earth's surface. 
        It was developed by Wladimir Köppen and Rudolf Geiger. The system distinguishes between major types
        of climates (Tropical, temperate, subarctic) as well as more granular distinctions among these broader
        classifications. </p>
        <p>For example, the Köppen-Geiger distinguishes between tropical monsoon climates (such as Monrovia, Liberia)
        and tropical rainforest climates (such as Manaus, Brazil). Similar distinctions are made in the temperate 
        climates: Washington, DC is classified as a Humid subtropical climate, while Los Angeles is a Mediterranean
        climate althoug both fall under the broad category of Temperate climates.</p>
        <p>These classifications were considered overly broad, particularly for temperate climates in Asia and North
        America, and were revised in the <a className="bottomText__link" href="https://en.wikipedia.org/wiki/Trewartha_climate_classification">Trewartha
        climate system</a>.</p>
      </div>
      <div className="bottomText__faq">
        <h2>Where is the Data From</h2>
        <p>Climate data is from <a className="bottomText__link" href="http://koeppen-geiger.vu-wien.ac.at/">this site</a> run by the Institute for 
        Veterinary Public Health and the Provincial Government of Carinthia in Austria. The KMZ overlay file was created
        by M. Scott Wilkerson and M. Beth Wilkerson at DePauw University.</p>
      </div>
     <div className="bottomText__faq">
      <h2>What Does this App Do?</h2>
      <p>This app to allow users to search for any place on the earth and see the corresponding climate zone. Results are
      placed on a Google Map, where a visual representation of the Köppen-Geiger classification can be overlaid.</p>
      <p><strong>Caveats:</strong> Occasionally discrepencies exist between the marker location, climate zone, and KMZ 
      overlay becuase the data set rounds each latitude longitude pair to the nearest half degree.</p>
      <p><strong>Technologies: </strong>This application is built with React.js, Google Fusion Tables, the Google Maps API, 
      and <a className="bottomText__link" href="https://github.com/tomchentw/react-google-maps">react-google-maps</a>.</p>
      <p><a className="bottomText__link" href="https://github.com/sco-tt/Climate-Zone-Query">source code</a> available on Github.</p>
     </div>
    </div>
  )
}

export default BottomText;