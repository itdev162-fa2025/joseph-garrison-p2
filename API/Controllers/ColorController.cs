using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ColorController : ControllerBase
{
    private readonly ILogger<ColorController> _logger;
    private readonly DataContext _context;
    public ColorController(ILogger<ColorController> logger, DataContext context)
    {
        _logger = logger;
        _context = context;
    }

    ///<summary>
    ///POST api/post
    ///</summary>
    ///<param name= "request">JSON request containing post fields</param>
    ///<return>A new post</returns>
    [HttpPost(Name = "Create")]
    public ActionResult<Color> Create([FromBody]Color request)
    {
        Console.WriteLine($"Db: {_context.DbPath}");

        var color = new Color()
        {
            Name = request.Name,
            HexCode = request.HexCode
        };

        _context.Colors.Add(color);
        var success = _context.SaveChanges() > 0;

        if (success)
        {
            return Ok(color);
        }

        throw new Exception("Error creating Color");
    }

    [HttpGet(Name = "GetColor")]
    public ActionResult<List<Color>> Get()
    {
        return this._context.Colors.ToList();
    }

}

