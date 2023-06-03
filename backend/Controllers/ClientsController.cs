using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class ClientsController : Controller
    {
        private readonly ILogger _logger;
        private readonly IClientRepository _clients;

        public ClientsController(ILogger<ClientsController> logger, IClientRepository clients)
        {
            _logger = logger;
            _clients = clients;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? field, [FromQuery] string? search, [FromQuery] int? page)
        {
            try
            {
                var r = Request.GetEncodedUrl();
                var pageInt = page ?? 1;
                IEnumerable<Client> clients;

                if (string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(search))
                    clients = await _clients.Get(pageInt);
                else
                    clients = await _clients.Get(pageInt, field, search);

                return Json(clients);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                return Json(await _clients.Get(id));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Client model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                var existing = await _clients.Get(model.ID);
                if (existing != null)
                    return BadRequest($"Client with ID {model.ID} already exists.");

                var success = await _clients.Upsert(model);
                return success ? Ok() : BadRequest();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Client model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                var existing = await _clients.Get(model.ID);
                if (existing == null)
                    return NotFound($"Client with ID {model.ID} doessn't exist.");

                var success = await _clients.Upsert(model);
                return success ? Ok() : BadRequest();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var success = await _clients.Delete(id);
                return success ? Ok() : BadRequest();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500);
            }
        }
    }
}