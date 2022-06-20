using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Subjects
{
    public class Create
    {
        public class Command : IRequest
        {
            public Subject Subjects { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Subjects.Add(request.Subjects);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
} 