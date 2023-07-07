import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { infoproductValidationSchema } from 'validationSchema/infoproducts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.infoproduct
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getInfoproductById();
    case 'PUT':
      return updateInfoproductById();
    case 'DELETE':
      return deleteInfoproductById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInfoproductById() {
    const data = await prisma.infoproduct.findFirst(convertQueryToPrismaUtil(req.query, 'infoproduct'));
    return res.status(200).json(data);
  }

  async function updateInfoproductById() {
    await infoproductValidationSchema.validate(req.body);
    const data = await prisma.infoproduct.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteInfoproductById() {
    const data = await prisma.infoproduct.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
