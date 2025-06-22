using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProEventos.Persistence;
using ProEventos.Persistence.Contextos;
using ProEventos.Domain;
using ProEventos.Application;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService _eventService;
        public EventosController(IEventoService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _eventService.GetAllEventosAsync(true);
                if (eventos == null || !eventos.Any())
                {
                    return NotFound("Não foi encontrado nenhum evento.");
                }
                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var evento = await _eventService.GetEventoByIdAsync(id);
                if (evento == null)
                {
                    return NotFound($"Evento por id não encontrado.");
                }
                return Ok(evento);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar evento. Erro: {ex.Message}");
            }
        }
        [HttpGet("tema/{tema}")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            try
            {
                var eventos = await _eventService.GetAllEventosByTemaAsync(tema);
                if (eventos == null)
                {
                    return NotFound($"Eventos por tema não encontrados.");
                }
                return Ok(eventos);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar evento por tema. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento evento)
        {
            try
            {
                var novoEvento = await _eventService.AddEvento(evento);
                if (novoEvento == null)
                {
                    return BadRequest("Erro ao tentar adicionar evento.");
                }
                return Ok(novoEvento);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar evento. Erro: {ex.Message}");
            }
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, Evento evento)
        {
            try
            {
                if (id != evento.Id)
                {
                    return BadRequest("Evento ID mismatch.");
                }

                var eventoAtualizado = await _eventService.UpdateEvento(id, evento);
                if (eventoAtualizado == null)
                {
                    return NotFound($"Evento com id {id} não encontrado.");
                }
                return Ok(eventoAtualizado);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar evento. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var evento = await _eventService.GetEventoByIdAsync(id);
                if (evento == null)
                {
                    return NotFound($"Evento com id {id} não encontrado.");
                }

                if (await _eventService.DeleteEvento(id))
                {
                    return Ok(new { message = "Evento deletado com sucesso." });
                }
                else
                {
                    return BadRequest("Erro ao tentar deletar o evento.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar deletar evento. Erro: {ex.Message}");
            }
        }
    }

}
