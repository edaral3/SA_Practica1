let Page = require("./driver");
const { until, By } = require("selenium-webdriver");
const fake = require("../utils/fakeData");
const fakeNameKeyword = fake.nameKeyword;

let searchInput, searchButton, resultStat;
let usuarioInput, pwdInput, ingresarButton, resultadoLogin;
let crearPButton,
  guardarPButton,
  nombrePInput,
  precioPInput,
  descPInput,
  fotoPInput,
  resultadoCrearP,
  slideProductos;
const ruta = "http://35.193.58.252:3000/#/";

Page.prototype.findInputAndButton = async function () {
  searchInput = await this.findByName("q");
  searchButton = await this.findByName("btnK");

  const result = await this.driver.wait(async function () {
    const searchInputEnableFlag = await searchInput.isEnabled();
    const searchButtonText = await searchButton.getAttribute("value");
    return {
      inputEnabled: searchInputEnableFlag,
      buttonText: searchButtonText,
    };
  }, 5000);
  return result;
};

Page.prototype.encontrarInputsBoton = async function () {
  usuarioInput = await this.findByName("usuario");
  pwdInput = await this.findByName("pwd");
  ingresarButton = await this.findByName("ingresar");

  const result = await this.driver.wait(async function () {
    const usuarioInputEnableFlag = await usuarioInput.isEnabled();
    const pwdInputEnableFlag = await pwdInput.isEnabled();
    const ingresarButtonText = await ingresarButton.getAttribute("value");
    return {
      usuarioEnabled: usuarioInputEnableFlag,
      pwdEnabled: pwdInputEnableFlag,
      buttonText: ingresarButtonText,
    };
  }, 15000);
  return result;
};

Page.prototype.encontrarInputsBotonProductos = async function () {
  crearPButton = await this.findByName("btncrear");
  await crearPButton.click();
  nombrePInput = await this.findByName("nombreP");
  precioPInput = await this.findByName("precioP");
  descPInput = await this.findByName("descP");
  fotoPInput = await this.findByName("fotoP");
  guardarPButton = await this.findByName("btnguardar");

  const result = await this.driver.wait(async function () {

    const crearPButtonEnableFlag = await crearPButton.isEnabled();
    const nombrePInputEnableFlag = await nombrePInput.isEnabled();
    const precioPInputEnableFlag = await precioPInput.isEnabled();
    const descPInputEnableFlag = await descPInput.isEnabled();
    const fotoPInputEnableFlag = await fotoPInput.isEnabled();
    const guardarPButtonEnableFlag = await guardarPButton.isEnabled();

    return {
     crearPButton : crearPButtonEnableFlag,
     nombrePInput : nombrePInputEnableFlag,
     precioPInput : precioPInputEnableFlag,
     descPInput : descPInputEnableFlag,
     fotoPInput : fotoPInputEnableFlag,
     guardarPButton : guardarPButtonEnableFlag
    };
  }, 5000);
  return result;
};

Page.prototype.submitLoginCorrecto = async function () {
  usuarioInput = await this.findById("input-usuario");
  pwdInput = await this.findById("input-pwd");
  ingresarButton = await this.findById("btn-ingresar");

  await this.write(usuarioInput, "prueba");
  await this.write(pwdInput, "prueba");
  await ingresarButton.click();

  resultadoLogin = await this.findById("mensaje-login");
  return await this.driver.wait(async function () {
    return await resultadoLogin.getText();
  }, 5000);
};

Page.prototype.submitLoginIncorrecto = async function () {
  //await this.encontrarInputsBoton();
  usuarioInput = await this.findById("input-usuario");
  pwdInput = await this.findById("input-pwd");
  ingresarButton = await this.findById("btn-ingresar");

  await this.write(usuarioInput, "incorrecto");
  await this.write(pwdInput, "incorrecto");
  await ingresarButton.click();

  /*resultadoLogin = await this.findByClassName("p-growl-title");
  return await this.driver.wait(async function () {
    return await resultadoLogin.getText();
  }, 10000);*/
  this.driver.takeScreenshot().then(
    function(image, err){
      require('fs').writeFile('/home/imagenes/out.png', image, 'base64', function(err){
        console.log(err);
      })
    }
  )
  return this.driver.wait(until.elementLocated(By.id('resultadoLogin')), 30 * 1000)
  .then(el => {
    return el.getText();
  });
};

Page.prototype.agregarProducto = async function () {
  //let crearPButton, guardarPButton, nombrePInput, precioPInput, descPInput, fotoPInput, resultadoCrearP;
  await this.submitLoginCorrecto();
  await this.visit(ruta + "productos");
  await this.encontrarInputsBotonProductos();

  await this.write(nombrePInput, "Prueba producto");
  await this.write(precioPInput, "123");
  await this.write(descPInput, "Descripcion prueba producto");
  await fotoPInput.sendKeys("/home/imagenes/burger.png");
  await guardarPButton.click();
  
  await this.visit(ruta);
  resultadoCrearP = await this.findByClassName("car-title");
  
  return await this.driver.wait(async function () {
    return await resultadoCrearP.getText();
  }, 5000);
};

//Debes llenar todos los campos primero.

Page.prototype.fallarAgregarProducto = async function () {
  //let crearPButton, guardarPButton, nombrePInput, precioPInput, descPInput, fotoPInput, resultadoCrearP;
  await this.submitLoginCorrecto();
  await this.visit(ruta + "productos");
  await this.encontrarInputsBotonProductos();

  await this.write(nombrePInput, "Prueba producto");
  await guardarPButton.click();
  
  resultadoCrearP = await this.findByClassName("p-growl-title");
  return await this.driver.wait(async function () {
    return await resultadoCrearP.getText();
  }, 5000);
};

module.exports = Page;
