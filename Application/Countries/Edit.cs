using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Countries
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Country Country { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var country = await _context.Countries.FindAsync(request.Country.Id);

                _mapper.Map(request.Country, country);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}