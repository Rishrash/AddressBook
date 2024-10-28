using AddressBook.Core.Entities;
using AddressBook.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AddressBook.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly AddressService _addressService;
        private readonly ILogger<AddressController> _logger;

        public AddressController(
            AddressService addressService,
            ILogger<AddressController> logger)
        {
            _addressService = addressService;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Address), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Address>> CreateAddress([FromBody] Address address)
        {
            try
            {
                _logger.LogInformation("Creating new address for {Name}", address.Name);

                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid model state for address creation");
                    return BadRequest(ModelState);
                }

                var result = await _addressService.CreateAddressAsync(address);

                _logger.LogInformation("Successfully created address with ID {AddressId} for {Name}",
                   result.Id, result.Name);

                return CreatedAtAction(
                    nameof(GetAddress),
                    new { id = result.Id },
                    result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating address");
                return StatusCode(500, "An error occurred while creating the address");
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Address), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Address>> GetAddress(int id)
        {
            try
            {
                _logger.LogInformation("Retrieving address with ID {AddressId}", id);

                var address = await _addressService.GetAddressAsync(id);
                if (address == null)
                {
                    _logger.LogWarning("Address with ID {AddressId} not found", id);
                    return NotFound();
                }

                _logger.LogInformation("Successfully retrieved address with ID {AddressId}", id);
                return Ok(address);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving address with ID {AddressId}", id);
                return StatusCode(500, "An error occurred while retrieving the address");
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Address>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Address>>> GetAllAddresses()
        {
            try
            {
                _logger.LogInformation("Retrieving all addresses");

                var addresses = await _addressService.GetAllAddressesAsync();

                _logger.LogInformation("Successfully retrieved {Count} addresses",
                    addresses.Count());

                return Ok(addresses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving all addresses");
                return StatusCode(500, "An error occurred while retrieving addresses");
            }
        }
    }
}