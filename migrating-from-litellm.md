# Migrating from LiteLLM to Bifrost

> Get 50x faster performance with 40% less latency overhead and 9.5% faster throughput compared to Python-based gateways. Built in Go for teams that need 99.99% uptime, production-ready reliability, and infrastructure that scales from prototype to millions of requests.
> 

**Migration Time:** ⚡ 15-30 minutes

---

## Why Migrate to Bifrost?

Bifrost is a high-performance, open-source LLM gateway built specifically for production environments. While LiteLLM works well for prototyping, teams scaling to production need infrastructure that doesn't become a bottleneck.

### Key Benefits

**🚀 50x Faster Performance**
Built in Go with just 11µs overhead at 5,000 RPS compared to ~8ms for Python-based solutions. Your gateway stops being the bottleneck.

**⚡ Production-Ready Reliability**
99.99% uptime SLA with automatic failover, circuit breakers, and intelligent retry logic. No more 4-minute latency spikes at high load.

**💰 Cost Optimization**
Semantic caching reduces costs by up to 80% on repeated queries. Adaptive load balancing ensures efficient resource utilization.

**🔒 Enterprise Security**
Virtual keys with budgets, RBAC, audit logs, and in-VPC deployments. Full control over your AI infrastructure.

**📊 Native Observability**
Built-in Prometheus metrics, OpenTelemetry support, and integration with Maxim's evaluation platform. No sidecars needed.

**🔧 Drop-in Replacement**
OpenAI-compatible API means zero code changes. Point your existing LiteLLM integration to Bifrost and you're done.

---

## Performance Benchmarks

Tested on identical AWS t3.xlarge instances. Bifrost delivers consistent, predictable performance under load.

| Metric | Bifrost | LiteLLM |
| --- | --- | --- |
| **Overhead per Request (5K RPS)** | 11µs | ~600µs (50x slower) |
| **P99 Latency at 500 RPS** | 520ms | 28,000ms |
| **P99 Latency at 1K RPS** | 1.2s | Crashes (memory exhaustion) |
| **Maximum Sustained RPS** | 5,000+ with stable performance | Fails at high load |

> **💡 For multi-step agent architectures:** Ten sequential LLM calls through Bifrost add ~110µs of gateway overhead. The same sequence through LiteLLM adds approximately 5ms, enough to noticeably impact real-time user experiences.
> 

---

## Feature Comparison

### Performance

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Overhead at 5K RPS | 11µs (Go-native) | ~600µs (Python GIL) |
| Memory Management | Deterministic, bounded | Unpredictable GC pauses |
| Concurrent Request Handling | Native Go concurrency | Async overhead |

### Reliability

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Uptime SLA | 99.99% | Community-maintained |
| Automatic Failover | ✓ Zero-config | ✓ Manual config |
| Circuit Breakers | ✓ | ✗ |
| Smart Request Queuing | ✓ | ✗ |
| Health Monitoring | ✓ Real-time | Basic |

### Provider Support

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Number of Providers | 15+ (OpenAI, Anthropic, Bedrock, Vertex, etc.) | 100+ providers |
| OpenAI-Compatible API | ✓ | ✓ |
| Custom Provider Support | ✓ | ✓ |

### Cost Optimization

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Semantic Caching | ✓ Reduce cost and latency | ✓ Available |
| Adaptive Load Balancing | ✓ Enterprise | Basic load balancing |
| Budget Management | ✓ Per-key budgets | ✓ Available |

### Governance & Security

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Virtual Keys | ✓ With budgets & rate limits | ✓ |
| RBAC | ✓ Enterprise | ✓ Enterprise |
| Audit Logs | ✓ Enterprise | ✓ Enterprise |
| Guardrails | ✓ Enterprise | ✓ Available |
| In-VPC Deployment | ✓ Enterprise | ✓ Self-hosted |

### Observability

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Prometheus Metrics | ✓ Native, no sidecars | ✓ Via callbacks |
| OpenTelemetry | ✓ | ✓ |
| Request Logging | ✓ SQLite/Postgres | ✓ Multiple backends |
| Evaluation Platform Integration | ✓ Maxim AI | Third-party tools |

### Developer Experience

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Setup Time | 30 seconds (NPX or Docker) | Quick pip install |
| Web UI | ✓ Real-time config | Admin panel available |
| Configuration Method | Web UI, API, or file-based | YAML config |
| SDK Language | Go (with HTTP/gRPC APIs) | Python SDK |
| MCP Support | ✓ Native gateway | ✓ Beta integration |

### Architecture

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Language | Go | Python |
| Deployment | Single binary, Docker, K8s | Python package, Docker |
| Clustering | ✓ Enterprise | Load balancer needed |
| Plugin System | ✓ Go-based | Python callbacks |

### Licensing

| Feature | Bifrost | LiteLLM |
| --- | --- | --- |
| Open Source License | Apache 2.0 | MIT |
| Enterprise Offering | ✓ 14-day free trial | ✓ Available |

---

## Migration Guide

Migrating from LiteLLM to Bifrost is straightforward. The OpenAI-compatible API means most applications require zero code changes.

### Step 1: Install Bifrost

Choose your preferred installation method:

**Option 1: NPX (fastest way to get started)**

```bash
npx -y @maximhq/bifrost
```

**Option 2: Docker**

```bash
docker pull maximhq/bifrost
docker run -p 8080:8080 maximhq/bifrost
```

**Option 3: Docker with persistence**

```bash
docker run -p 8080:8080 -v $(pwd)/data:/app/data maximhq/bifrost
```

Bifrost starts immediately with zero configuration needed. Access the web UI at `http://localhost:8080`

---

### Step 2: Configure Provider Keys

Add your LLM provider API keys via the web UI or configuration file.

### Option A: Web UI (Recommended)

1. Navigate to `http://localhost:8080`
2. Click "Providers" in the sidebar
3. Add API keys for OpenAI, Anthropic, Bedrock, or other providers
4. Configure models, weights, and fallback chains

### Option B: Configuration File

Create a `config.json` file in your app directory:

```json
{
  "providers": {
    "openai": {
      "keys": [
        {
          "name": "openai-key-1",
          "value": "env.OPENAI_API_KEY",
          "models": ["gpt-4o", "gpt-4o-mini"],
          "weight": 1.0
        }
      ]
    },
    "anthropic": {
      "keys": [
        {
          "name": "anthropic-key-1",
          "value": "env.ANTHROPIC_API_KEY",
          "models": ["claude-sonnet-4-20250514"],
          "weight": 1.0
        }
      ]
    }
  },
  "fallbacks": {
    "gpt-4o": ["anthropic/claude-sonnet-4-20250514"]
  }
}
```

---

### Step 3: Update Your Application

If you're using LiteLLM's proxy server, simply update the base URL. Most applications need only this single change.

**Before (LiteLLM):**

```python
import openai

client = openai.OpenAI(
    api_key="your-litellm-key",
    base_url="http://localhost:4000"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

**After (Bifrost):**

```python
import openai

client = openai.OpenAI(
    api_key="your-bifrost-key",  # Or use provider keys directly
    base_url="http://localhost:8080"  # Only change needed!
)

response = client.chat.completions.create(
    model="openai/gpt-4o",  # Provider prefix for clarity
    messages=[{"role": "user", "content": "Hello!"}]
)
```

> **Note:** Bifrost uses the `provider/model` format (e.g., `openai/gpt-4o`) to specify which provider to use. This gives you explicit control over routing.
> 

---

### Step 4: Configure Fallbacks and Load Balancing

Bifrost provides automatic failover with zero configuration, but you can customize fallback chains for specific models.

```json
{
  "fallbacks": {
    "openai/gpt-4o": [
      "anthropic/claude-sonnet-4-20250514",
      "bedrock/anthropic.claude-v2"
    ]
  },
  "load_balancing": {
    "strategy": "round_robin"  // or "least_busy", "weighted"
  }
}
```

---

### Step 5: Enable Observability

Bifrost includes native Prometheus metrics and integrates with Maxim's evaluation platform.

### Prometheus Metrics

Metrics automatically available at: `http://localhost:8080/metrics`

**Key metrics:**

- `bifrost_requests_total`
- `bifrost_request_duration_seconds`
- `bifrost_provider_health`
- `bifrost_cache_hit_rate`

### Maxim Integration

```json
{
  "plugins": {
    "maxim": {
      "enabled": true,
      "api_key": "env.MAXIM_API_KEY",
      "base_url": "https://app.getmaxim.ai"
    }
  }
}
```

---

### Step 6: Test and Validate

Run your existing test suite to validate the migration. Bifrost's OpenAI-compatible API ensures compatibility.

**Quick validation test:**

```bash
curl -X POST http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello, Bifrost!"}]
  }'
```

**Check health endpoint:**

```bash
curl http://localhost:8080/health
```

**View metrics:**

```bash
curl http://localhost:8080/metrics
```

**Validation checklist:**

- [ ]  Verify all provider connections in the web UI
- [ ]  Test failover by temporarily disabling a provider
- [ ]  Monitor request latency and success rates
- [ ]  Validate semantic caching (if enabled)

---

## Common Migration Scenarios

### Migrating Virtual Keys

If you're using LiteLLM's virtual keys for team budgets, Bifrost offers equivalent functionality:

```bash
curl -X POST http://localhost:8080/api/keys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "team-engineering",
    "budget": 1000,
    "rate_limit": 100,
    "models": ["openai/gpt-4o", "anthropic/claude-sonnet-4-20250514"]
  }'
```

### Migrating Custom Callbacks

LiteLLM callbacks can be replaced with Bifrost plugins or webhooks:

```json
{
  "webhooks": {
    "on_request": "https://your-api.com/webhook/request",
    "on_response": "https://your-api.com/webhook/response"
  }
}
```

For Go-based plugins, see: https://docs.getbifrost.ai/plugins/getting-started

---

## LiteLLM SDK Compatibility

If your application uses the LiteLLM Python SDK directly (not the proxy), Bifrost provides a compatibility layer.

**Option 1: Use Bifrost as drop-in replacement (recommended)**

```python
import openai
client = openai.OpenAI(
    base_url="http://localhost:8080",
    api_key="your-key"
)
```

**Option 2: Use LiteLLM SDK with Bifrost proxy**

```python
import litellm
litellm.api_base = "http://localhost:8080"
response = litellm.completion(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

For full LiteLLM SDK compatibility details, see the [Bifrost LiteLLM SDK Integration Guide](https://docs.getbifrost.ai/integrations/litellm-sdk).

---

## When to Migrate

### You Should Migrate If:

- **Scaling beyond prototyping:** Performance characteristics matter when handling production traffic with latency requirements.
- **Building multi-step agent architectures:** The overhead difference compounds with each LLM call in a chain.
- **Need enterprise governance:** Budget management, access control, and audit trails are essential as AI usage grows.
- **Want integrated observability:** Connection to Maxim's platform provides visibility that standalone gateways cannot match.
- **Experiencing reliability issues:** If you're seeing timeout spikes, memory issues, or unpredictable latency at scale.
- **Need better cost control:** Semantic caching and adaptive load balancing reduce infrastructure costs.

---

## Resources

- **Documentation:** https://docs.getbifrost.ai
- **GitHub:** https://github.com/maximhq/bifrost
- **Enterprise Trial:** https://www.getmaxim.ai/bifrost/enterprise
- **Discord Community:** https://getmax.im/bifrost-discord

---