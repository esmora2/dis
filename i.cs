using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Threading;
using Reqnroll;
using Reqnroll.CommonModels;
using TDBTestingMVC.Data;
using TDBTestingMVC.Models;


namespace ReqnrollTestProject1.StepDefinitions
{
    [Binding]
    public class InsertStepDefinitions 
    {

        private readonly ClienteDataAccesLayer _clienteDAL = new ClienteDataAccesLayer();
        

        [Given("Llenar los campos del Formulario")]
        public void GivenLlenarLosCamposDelFormulario(DataTable dataTable)
        {
            var resultado = dataTable.Rows.Count;

            Assert.True(resultado >= 1, $"Se esperaba al menos una fila en la tabla, pero se encontraron {resultado} filas.");
        }

        [When("Registro de usuario en la BDD")]
        public void WhenRegistroDeUsuarioEnLaBDD(DataTable dataTable)
        {
            var cliente = dataTable.CreateSet<Cliente>().ToList();

            Cliente cls = new Cliente();

            foreach (var item in cliente)
            {
                cls.Cedula = item.Cedula;
                cls.Apellidos = item.Apellidos;
                cls.Nombres = item.Nombres;
                cls.FechaNacimiento = item.FechaNacimiento;
                cls.Mail = item.Mail;
                cls.Telefono = item.Telefono;
                cls.Direccion = item.Direccion;
                cls.Estado = item.Estado;
            }

            try
            {
                _clienteDAL.AddCliente(cls);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al insertar el cliente: {ex.Message}");
            }
        }

        [Then("El resultado de registro en la BDD")]
        public void ThenElResultadoDeRegistroEnLaBDD(DataTable dataTable)
        {
            var clienteEsperado = dataTable.Rows[0];

            // Buscar en la base de datos el cliente insertado
            var clienteBD = _clienteDAL.GetClientes().FirstOrDefault(c => c.Cedula == clienteEsperado["Cedula"]);

            //// Verificar que el cliente fue insertado
            //Assert.NotNull(clienteBD);

            //// Comparar los valores insertados con los valores en la base de datos
            //Assert.Equal(clienteEsperado["Cedula"], clienteBD.Cedula);
            //Assert.Equal(clienteEsperado["Apellido"], clienteBD.Apellidos);
            //Assert.Equal(clienteEsperado["Nombres"], clienteBD.Nombres);
            //Assert.Equal(DateTime.Parse(clienteEsperado["FechaNacimiento"]), clienteBD.FechaNacimiento);
            //Assert.Equal(clienteEsperado["Mail"], clienteBD.Mail);
            //Assert.Equal(clienteEsperado["Telefono"], clienteBD.Telefono);
            //Assert.Equal(clienteEsperado["Direccion"], clienteBD.Direccion);
            //bool estadoEsperado = clienteEsperado["Estado"] == "1"; // Convierte "1" en true y "0" en false
            //Assert.Equal(estadoEsperado, clienteBD.Estado);


            Assert.True(clienteBD != null, "El cliente no fue insertado correctamente en la base de datos.");
        }


    }
}
