import { library } from '@fortawesome/fontawesome-svg-core';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookSquare,
  faLinkedin,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

//Add FA icons to the library here!
export const faLibrary = () => {
  library.add(faCoffee, faFacebookSquare, faLinkedin, faTwitter, faYoutube);
};
