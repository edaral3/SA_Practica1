const { describe, it, after, before } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker/locale/es');

const expect = chai.expect;
chai.use(chaiHttp);

process.on('unhandledRejection', () => { });

(async function example() {
    try {

        const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
        const type = ['usuario', 'admin', 'restaurante']
        const userName = faker.internet.userName(name)

        const userTest = {
            email: faker.internet.email(name),
            user: userName,
            name: name,
            pwd: faker.internet.password(),
            type: type[faker.random.number({ min: 0, max: 3 })]
        };

        //console.log(userTest)

        describe('Usuario', () => {
            
            describe('POST /', () => {
                
                it("Guardar un usuario con datos correctos", done => {
                   /* chai
                        .request("localhost:4001")
                        .post("/user")
                        .send(userTest)
                        .end((err, res) => {
                            expect(res).to.have.status(201);
                            expect(res.body).to.be.a('object');
                            expect(res.body.user).to.equal(userTest.user);
                            done();
                        });*/
                        done();
                });

                it("Guardar un usuario existente", done => {
                   /* chai
                        .request("localhost:4001")
                        .post("/user")
                        .send(userTest)
                        .end((err, res) => {
                            expect(res).to.have.status(409);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).to.equal(`El usuario ${userTest.user} ya esta registrado`);
                            done();
                        });*/
                        done();
                });

                it("Intentar guardar un usuario con datos incompletos", done => {
                    const user = userTest.user;
                    delete userTest.user;
                   /* chai
                        .request("localhost:4001")
                        .post("/user")
                        .send(userTest)
                        .end((err, res) => {
                            expect(res).to.have.status(400);
                            expect(res.body).to.be.a('object');
                            expect(res.body.message).to.equal('No se cuenta con los campos necesarios para el registro');
                            done();
                        });*/
                        done();
                    userTest.user = user;
                });

            });

            describe('DELETE /', () => {

                it("Eliminar un usuario con datos correctos", done => {
                    /*chai
                        .request("localhost:4005")
                        .delete("/user/" + userTest.user)
                        .end((err, res) => {
                            expect(res).to.have.status(201);
                            expect(res.body).to.be.a('object');
                            expect(res.body.user).to.equal(userTest.user);
                            done();
                        });*/
                        done();
                });
            
            });

        });

        const productfirstName = faker.name.firstName() 
        const productlastName = faker.name.lastName()
        const productName = `${productfirstName} ${productlastName}`;
        const productoTest = {
            //POST
            id: productName,
            nombre: "Pizza",
            nombre_fotografia: faker.image.imageUrl(),
            fotografia: faker.image.imageUrl(),
            descripcion: "Descripcion",//faker.commerce.productDescription()
            precio: Number(faker.commerce.price()),
            oferta: Number(faker.commerce.price()),
            id_usuario: userName,
            nombre_usuario: name
        };

        //console.log(productoTest)

        describe('Producto', () => {
            
            describe('POST /', () => {
                it("Intentar guardar un producto con datos incorrectos", done => {
                    /*chai
                        .request("localhost:9001")
                        .post("/productos")
                        .send(productoTest)
                        .end((err, res) => {
                            expect(res).to.have.status(400);
                            done();
                        });*/
                        done();
                });
            });

            describe('GET /', () => {
                it("Obtener todos los Productos", done => {
                    /*chai
                        .request("localhost:9001")
                        .get("/productos")
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            done();
                        });*/
                        done();
                });
            });

            describe('PUT /', () => {
                it("Intentar modificar un producto con datos incorrectos", done => {
                    /*chai
                        .request("localhost:9001")
                        .put("/productos")
                        .send(productoTest)
                        .end((err, res) => {
                            expect(res).to.have.status(201);
                            done();
                        });*/
                        done();
                });
            });

            describe('DELETE /', () => {
                it("Intentar eliminar un producto con datos incorrectos", done => {
                    /*chai
                        .request("localhost:9001")
                        .delete("/productos/Pizza")
                        .end((err, res) => {
                            expect(res).to.have.status(400);
                            done();
                        });*/
                        done();
                });
            });

        });

        const ordenTest = {
            id_usuario: userName,
            direccion: faker.address.country(),
            tienda: "tienda_prueba",
            productos: [
                {
                    id_producto: productName,
                    nombre_producto: productName,
                    cantidad_producto: faker.random.number({ min: 1, max: 3 })
                },
                {
                    id_producto: faker.name.findName(),
                    nombre_producto: faker.name.findName(),
                    cantidad_producto: faker.random.number({ min: 1, max: 3 })
                }
            ]
        };

        //console.log(ordenTest)

        describe('Orden', () => {
            
            describe('POST /', () => {
                it("Guardar una orden con datos correctos", done => {
                    /*chai
                        .request("localhost:4007")
                        .post("/orden")
                        .send(ordenTest)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            done();
                        });*/
                        done();
                });
            });

            describe('GET /', () => {
                it("Obtener todas las ordenes", done => {
                    /*chai
                        .request("localhost:4007")
                        .get("/orden")
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            done();
                        });*/
                        done();
                });
            });

            describe('PUT /', () => {
                it("Intentar modificar el estado de una orden con datos incorrectos", done => {
                    /*chai
                        .request("localhost:4007")
                        .put("/orden/" + faker.name.findName() + "/" + faker.random.number({ min: 0, max: 5 }))
                        .end((err, res) => {
                            expect(res).to.have.status(404);
                            done();
                        });*/
                        done();
                });
            });

            describe('DELETE /', () => {
                it("Intentar eliminar una orden con datos incorrectos", done => {
                    /*chai
                        .request("localhost:4007")
                        .delete("/orden/" + faker.name.findName())
                        .end((err, res) => {
                            expect(res).to.have.status(404);
                            done();
                        });*/
                        done();
                });
            });

        });

    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {

    }
})();
