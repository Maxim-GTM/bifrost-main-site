import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

const S3_ENDPOINT = process.env.AWS_ENDPOINT_URL_S3
const AWS_REGION =
  process.env.AWS_REGION && process.env.AWS_REGION !== 'auto' ? process.env.AWS_REGION : 'us-east-1'
const PARTNERS_BUCKET = 'partners-program-submissions'
const PARTNERS_PREFIX = 'partners-program/applications'

const s3Client = new S3Client({
  region: AWS_REGION,
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
})

export type PartnerApplication = {
  id: string
  firstName: string
  lastName: string
  workEmail: string
  companyName: string
  companySize: string
  companyHQ: string
  message: string
  createdAt: string
  status: 'new' | 'reviewed'
}

export async function savePartnerApplication(
  data: Omit<PartnerApplication, 'id' | 'createdAt' | 'status'>
) {
  const id = uuidv4()
  const createdAt = new Date().toISOString()
  const application: PartnerApplication = {
    id,
    createdAt,
    status: 'new',
    ...data,
  }

  const key = `${PARTNERS_PREFIX}/${id}.json`
  const command = new PutObjectCommand({
    Bucket: PARTNERS_BUCKET,
    Key: key,
    Body: JSON.stringify(application, null, 2),
    ContentType: 'application/json',
  })

  await s3Client.send(command)
  return { application, key, bucket: PARTNERS_BUCKET }
}
