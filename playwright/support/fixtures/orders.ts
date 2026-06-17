import fs from 'node:fs'
import path from 'node:path'

import { OrderDetails } from '../actions/orderLookupActions'

type OrderKey = 'aprovado' | 'reprovado' | 'emAnalise'

const file = path.resolve(__dirname, 'orders.json')
const raw = fs.readFileSync(file, 'utf-8')

export const orders = JSON.parse(raw) as Record<OrderKey, OrderDetails>
