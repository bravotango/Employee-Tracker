const questions = require('./questions');

const intro = () => {
  console.log(`
              W E L C O M E
           
                   to
                   
$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$
$                                         $
$     E m p l o y e e   T r a c k e r     $
$                                         $
$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$-$

`);
};

const init = () => {
  intro();
  questions();
};

init();
