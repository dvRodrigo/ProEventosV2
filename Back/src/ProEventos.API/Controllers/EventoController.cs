using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly IEnumerable<Evento> _evento = new Evento[]
        {
            new Evento()
            {
                EventoId = 1,
                Local = "São Paulo",
                DataEvento = DateTime.Now.AddDays(2).ToString(),
                Tema = "Angular e .NET",
                QtdPessoas = 250,
                Lote = "1º Lote",
                ImagemURL = "http://www.google.com"
            },
            new Evento()
            {
                EventoId = 2,
                Local = "Rio de Janeiro",
                DataEvento = DateTime.Now.AddDays(3).ToString(),
                Tema = "Angular e .NET",
                QtdPessoas = 250,
                Lote = "1º Lote",
                ImagemURL = "http://www.google.com"
            }
        };
        public EventoController()
        {
        }
        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }
        [HttpGet("{id:int}")]
        public Evento GetById(int id)
        {
            return _evento.FirstOrDefault(e => e.EventoId == id);
        }
    }

}
