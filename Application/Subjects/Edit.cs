using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Subjects
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Subject Subject { get; set; }
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
                var subject = await _context.Subjects.FindAsync(request.Subject.Id);

               _mapper.Map(request.Subject, subject);

                 _context.Entry<Subject>(subject).CurrentValues.SetValues(request.Subject);
                _context.SaveChanges();

                return Unit.Value;
            }
        }
    }
} 