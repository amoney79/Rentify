/**
 * Rentify chat Engine
 * Handles messages,file attachments,video call triggers, and real-time updates.
 */

class RentifyChatEngine {
    constructor(){
        this.currentUser = null;
        this.partnerUser = null;
        this.lastMessageCount = 0;
        this.pollingInterval = null;

        //core DOM references
        this.messagesContainer = document.getElementById('chat-messages-container');
        this.messageInput = document.getElementById('chat-message-input');
        this.partnerNameEl = document.getElementById('chat-partner-name');
        this.partnerAvatarEl = document.getElementById('chat-partner-avatar');
    }

    async init () {
        try {
            //Load currentt user and partner details
            this.currentUser = await RentifyAPI.getCurrentUser();
            const urlParams =  new URLSearchParams(window.location.search);
            const partnerId = urlParams.get('partnerId') || 2 ;

            this.partnerUser = await RentifyAPI.getUserById(partner);
            this.updatePartnerHeader();

            // Bind all UI buttons and inputs
            this.bindEvents();

            //Fetch initial messages and start polling for updates
            await this.loadMessages();
            this.startPolling();
        } catch(err) {
            console.error('Failed to initialize RentifyChatEngine:',err);
        }
    }
}