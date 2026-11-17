/**
 * Rentify Chat Engine
 * Handles messaging, file attachments, video call triggers, and real-time updates.
 */
class RentifyChatEngine {
    constructor() {
        this.currentUser = null;
        this.partnerUser = null;
        this.lastMessageCount = 0;
        this.pollingInterval = null;

        // Core DOM references
        this.messagesContainer = document.getElementById('chat-messages-container');
        this.messageInput = document.getElementById('chat-message-input');
        this.partnerNameEl = document.getElementById('chat-partner-name');
        this.partnerAvatarEl = document.getElementById('chat-partner-avatar');
    }

    async init() {
        try {
            // 1. Load current user and partner details
            this.currentUser = await RentifyAPI.getCurrentUser();
            const urlParams = new URLSearchParams(window.location.search);
            const partnerId = urlParams.get('partnerId') || 2;
            
            this.partnerUser = await RentifyAPI.getUserById(partnerId);
            this.updatePartnerHeader();

            // 2. Bind all UI buttons and inputs
            this.bindEvents();

            // 3. Fetch initial messages and start polling for updates
            await this.loadMessages();
            this.startPolling();
        } catch (err) {
            console.error('Failed to initialize RentifyChatEngine:', err);
        }
    }

    updatePartnerHeader() {
        if (!this.partnerUser) return;
        if (this.partnerNameEl) {
            this.partnerNameEl.textContent = this.partnerUser.name || `User #${this.partnerUser.id}`;
        }
        if (this.partnerAvatarEl && this.partnerUser.avatar) {
            this.partnerAvatarEl.src = this.partnerUser.avatar;
        }
    }

    async loadMessages() {
        if (!this.partnerUser) return;
        try {
            const messages = await RentifyAPI.getChatHistory(this.partnerUser.id);
            
            // Only re-render if message count changed to prevent UI flickering
            if (Array.isArray(messages) && messages.length !== this.lastMessageCount) {
                this.lastMessageCount = messages.length;
                this.renderMessages(messages);
            }
        } catch (err) {
            console.error('Error loading chat history:', err);
        }
    }

    renderMessages(messages) {
        if (!this.messagesContainer) return;
        this.messagesContainer.innerHTML = '';

        messages.forEach((msg) => {
            const isMine = msg.senderId === this.currentUser?.id;
            const wrapper = document.createElement('div');
            wrapper.className = `chat-message-row ${isMine ? 'mine' : 'theirs'}`;

            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${isMine ? 'sent' : 'received'}`;

            if (msg.type === 'IMAGE' && msg.attachmentUrl) {
                const img = document.createElement('img');
                img.src = msg.attachmentUrl;
                img.alt = msg.content || 'Image attachment';
                img.className = 'chat-attachment-img';
                img.onclick = () => window.open(msg.attachmentUrl, '_blank');
                bubble.appendChild(img);
            } else if (msg.type === 'DOCUMENT' && msg.attachmentUrl) {
                const link = document.createElement('a');
                link.href = msg.attachmentUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'chat-attachment-doc';
                link.textContent = `📄 ${msg.content || 'Download Document'}`;
                bubble.appendChild(link);
            } else {
                bubble.textContent = msg.content;
            }

            // Optional timestamp
            if (msg.createdAt) {
                const timeEl = document.createElement('span');
                timeEl.className = 'chat-timestamp';
                timeEl.textContent = new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                wrapper.appendChild(bubble);
                wrapper.appendChild(timeEl);
            } else {
                wrapper.appendChild(bubble);
            }

            this.messagesContainer.appendChild(wrapper);
        });

        this.scrollToBottom();
    }

    scrollToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    async sendMessage() {
        const text = this.messageInput?.value.trim();
        if (!text) return;

        // Clear input right away for instant feedback
        this.messageInput.value = '';

        try {
            const recipientId = this.partnerUser ? this.partnerUser.id : 2;
            await RentifyAPI.sendChatMessage(recipientId, text, 'TEXT', null);
            await this.loadMessages();
        } catch (err) {
            console.error('Failed to send message:', err);
            // Restore text if sending failed
            this.messageInput.value = text;
        }
    }

    startVideoCall() {
        const recipientId = this.partnerUser ? this.partnerUser.id : 2;
        window.location.href = `video-call.html?partnerId=${recipientId}`;
    }

    startPolling() {
        this.stopPolling();
        this.pollingInterval = setInterval(() => this.loadMessages(), 3000);
    }

    stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
    }

    bindEvents() {
        // Send button
        const sendBtn = document.getElementById('chat-send-btn');
        sendBtn?.addEventListener('click', () => this.sendMessage());

        // Enter key in input
        const input = document.getElementById('chat-message-input');
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Video call trigger button
        const videoCallBtn = document.getElementById('chat-video-call-btn');
        videoCallBtn?.addEventListener('click', () => this.startVideoCall());

        // File attachment button
        const attachBtn = document.getElementById('chat-attach-btn');
        const fileInput = document.getElementById('chat-file-input');
        attachBtn?.addEventListener('click', () => fileInput?.click());

        fileInput?.addEventListener('change', async (e) => {
            if (e.target.files && e.target.files) {
                const file = e.target.files;
                try {
                    const uploaded = await RentifyAPI.uploadChatAttachment(file);
                    const recipientId = this.partnerUser ? this.partnerUser.id : 2;
                    await RentifyAPI.sendChatMessage(
                        recipientId,
                        file.name,
                        file.type.startsWith('image/') ? 'IMAGE' : 'DOCUMENT',
                        uploaded.url
                    );
                    await this.loadMessages();
                } catch (err) {
                    console.error('File upload failed:', err);
                } finally {
                    fileInput.value = '';
                }
            }
        });

        // Schedule viewing trigger inside chat
        const scheduleBtn = document.getElementById('chat-schedule-viewing-btn');
        scheduleBtn?.addEventListener('click', () => {
            const recipientId = this.partnerUser ? this.partnerUser.id : 2;
            window.location.href = `schedule.html?partnerId=${recipientId}`;
        });

        // Clean up polling when leaving the page
        window.addEventListener('beforeunload', () => this.stopPolling());
    }
}

// Instantiate globally
document.addEventListener('DOMContentLoaded', () => {
    window.chatEngine = new RentifyChatEngine();
    window.chatEngine.init();
});
